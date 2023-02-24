import { UploadFileOption, UploadTask } from "./interface";
import {
  createCallbackManager,
  convertObjectUrlToBlob,
  NETWORK_TIMEOUT,
  setHeader,
  XHR_STATS,
} from "./utils";

const createUploadTask = ({
  url,
  filePath,
  formData,
  name,
  header,
  timeout,
  fileName,
  success,
  error,
}) => {
  let timeoutInter;
  let formKey;
  const apiName = "uploadFile";
  const xhr = new XMLHttpRequest();
  const form = new FormData();
  const callbackManager = {
    headersReceived: createCallbackManager(),
    progressUpdate: createCallbackManager(),
  };

  xhr.open("POST", url);
  setHeader(xhr, header);

  // eslint-disable-next-line guard-for-in
  for (formKey in formData) {
    form.append(formKey, formData[formKey]);
  }

  xhr.upload.onprogress = e => {
    const { loaded, total } = e;
    callbackManager.progressUpdate.trigger({
      progress: Math.round((loaded / total) * 100),
      totalBytesSent: loaded,
      totalBytesExpectedToSent: total,
    });
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XHR_STATS.HEADERS_RECEIVED) return;
    callbackManager.headersReceived.trigger({
      header: xhr.getAllResponseHeaders(),
    });
  };

  xhr.onload = () => {
    const { status } = xhr;
    clearTimeout(timeoutInter);
    success({
      errMsg: `${apiName}:ok`,
      statusCode: status,
      data: xhr.responseText || xhr.response,
    });
  };

  xhr.onabort = () => {
    clearTimeout(timeoutInter);
    error({
      errMsg: `${apiName}:fail abort`,
    });
  };

  xhr.onerror = e => {
    clearTimeout(timeoutInter);
    error({
      errMsg: `${apiName}:fail ${(e as any)?.message}`,
    });
  };

  /**
   * 中断任务
   */
  const abort = () => {
    clearTimeout(timeoutInter);
    xhr.abort();
  };

  const send = () => {
    xhr.send(form);
    timeoutInter = setTimeout(() => {
      xhr.onabort = null;
      xhr.onload = null;
      xhr.upload.onprogress = null;
      xhr.onreadystatechange = null;
      xhr.onerror = null;
      abort();
      error({
        errMsg: `${apiName}:fail timeout`,
      });
    }, timeout || NETWORK_TIMEOUT);
  };

  convertObjectUrlToBlob(filePath)
    .then((fileObj: any) => {
      form.append(
        name,
        fileObj,
        fileName || fileObj.name || `file-${Date.now()}`
      );
      send();
    })
    .catch(e => {
      error({
        errMsg: `${apiName}:fail ${e.message}`,
      });
    });

  /**
   * 监听 HTTP Response Header 事件。会比请求完成事件更早
   */
  const onHeadersReceived = callbackManager.headersReceived.add;
  /**
   * 取消监听 HTTP Response Header 事件
   */
  const offHeadersReceived = callbackManager.headersReceived.remove;

  /**
   * 监听进度变化事件
   */
  const onProgressUpdate = callbackManager.progressUpdate.add;
  /**
   * 取消监听进度变化事件
   */
  const offProgressUpdate = callbackManager.progressUpdate.remove;

  return {
    abort,
    onHeadersReceived,
    offHeadersReceived,
    onProgressUpdate,
    offProgressUpdate,
  };
};

export const upload = ({
  url,
  filePath,
  name,
  header,
  formData,
  timeout,
  fileName,
  success,
  fail,
  complete,
}: UploadFileOption) => {
  let task;
  const promise = new Promise((resolve, reject) => {
    task = createUploadTask({
      url,
      header,
      name,
      filePath,
      formData,
      timeout,
      fileName,
      success: res => {
        success && success(res);
        complete && complete();
        resolve(res);
      },
      error: res => {
        fail && fail(res);
        complete && complete();
        reject(res);
      },
    });
  }) as any;

  promise.headersReceive = task.onHeadersReceived;
  promise.progress = task.onProgressUpdate;
  promise.abort = task.abort;

  return promise as UploadTask;
};
