type Func = (...args: any) => void;

export const createCallbackManager = () => {
  const callbacks: Func[] = [];

  /**
   * 添加回调
   */
  const add = (opt: Func) => {
    callbacks.push(opt);
  };

  /**
   * 移除回调
   */
  const remove = (opt: Func) => {
    let pos = -1;
    callbacks.forEach((callback, k) => {
      if (callback === opt) {
        pos = k;
      }
    });
    if (pos > -1) {
      callbacks.splice(pos, 1);
    }
  };

  /**
   * 获取回调函数数量
   */
  const count = () => callbacks.length;

  /**
   * 触发回调
   */
  const trigger = (...args) => {
    callbacks.forEach(opt => {
      if (typeof opt === "function") {
        opt(...args);
      } else {
        const { callback, ctx } = opt as any;
        callback.call(ctx, ...args);
      }
    });
  };

  return {
    add,
    remove,
    count,
    trigger,
  };
};

export const NETWORK_TIMEOUT = 60000;

export const XHR_STATS = {
  UNSENT: 0, // Client has been created. open() not called yet.
  OPENED: 1, // open() has been called.
  HEADERS_RECEIVED: 2, // send() has been called, and headers and status are available.
  LOADING: 3, // Downloading; responseText holds partial data.
  DONE: 4, // The operation is complete.
};

/**
 * 设置xhr的header
 */
export const setHeader = (xhr: XMLHttpRequest, header: Record<string, any>) => {
  let headerKey;
  // eslint-disable-next-line guard-for-in
  for (headerKey in header) {
    xhr.setRequestHeader(headerKey, header[headerKey]);
  }
};

/**
 * 将 blob url 转化为文件
 * @param {string} url 要转换的 blob url
 * @returns {Promise<File>}
 */
export const convertObjectUrlToBlob = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function onload() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        /* eslint-disable prefer-promise-reject-errors */
        reject({ status: this.status });
      }
    };
    xhr.send();
  });
};

export function shouldBeObject(target) {
  if (target && typeof target === "object") return { res: true };
  return {
    res: false,
    msg: getParameterError({
      correct: "Object",
      wrong: target,
    }),
  };
}

function upperCaseFirstLetter(string: string) {
  if (typeof string !== "string") return string;
  // eslint-disable-next-line no-param-reassign
  string = string.replace(/^./, match => match.toUpperCase());
  return string;
}

export function getParameterError({ name = "", para = null, correct, wrong }) {
  const parameter = para ? `parameter.${para}` : "parameter";
  const errorType = upperCaseFirstLetter(
    wrong === null ? "Null" : typeof wrong
  );
  return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`;
}
