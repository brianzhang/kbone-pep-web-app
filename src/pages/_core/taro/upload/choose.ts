import {
  ChooseImageOption,
  ChooseImageSuccessCallbackResult,
} from "./interface";
import { getParameterError, shouldBeObject } from "./utils";

export function chooseImage(
  options: ChooseImageOption
): Promise<ChooseImageSuccessCallbackResult> {
  // options must be an Object
  const isObject = shouldBeObject(options);
  if (!isObject.res) {
    const res = { errMsg: `chooseImage${isObject.msg}` };
    console.error(res.errMsg);
    return Promise.reject(res);
  }

  const {
    count = 1,
    success,
    fail,
    complete,
    imageId = "taroChooseImage",
  } = options;
  const res = {
    errMsg: "chooseImage:ok",
    tempFilePaths: [],
    tempFiles: [],
  };

  if (count && typeof count !== "number") {
    res.errMsg = getParameterError({
      name: "chooseImage",
      para: "count",
      correct: "Number",
      wrong: count,
    });
    console.error(res.errMsg);
    typeof fail === "function" && fail(res);
    typeof complete === "function" && complete(res);
    return Promise.reject(res);
  }

  let taroChooseImageId = document.getElementById(imageId) as HTMLInputElement;
  if (!taroChooseImageId) {
    const obj = document.createElement("input");
    obj.setAttribute("type", "file");
    obj.setAttribute("id", imageId);
    if (count > 1) {
      obj.setAttribute("multiple", "multiple");
    }
    obj.setAttribute("accept", "image/*");
    obj.setAttribute(
      "style",
      "position: fixed; top: -4000px; left: -3000px; z-index: -300;"
    );
    document.body.appendChild(obj);
    taroChooseImageId = document.getElementById(imageId) as HTMLInputElement;
  }
  let taroChooseImageCallback;
  const taroChooseImagePromise = new Promise(resolve => {
    taroChooseImageCallback = resolve;
  });
  const TaroMouseEvents = document.createEvent("MouseEvents");
  TaroMouseEvents.initEvent("click", true, true);
  taroChooseImageId.dispatchEvent(TaroMouseEvents);
  taroChooseImageId.onchange = function handleChange(e: any) {
    const arr = [...e.target.files];
    arr &&
      arr.forEach(item => {
        const blob = new Blob([item], {
          type: item.type,
        });
        const url = URL.createObjectURL(blob);
        res.tempFilePaths.push(url);
        res.tempFiles.push({
          path: url,
          size: item.size,
          type: item.type,
        });
      });
    typeof success === "function" && success(res);
    typeof complete === "function" && complete(res);
    taroChooseImageCallback(res);
    e.target.value = "";
  };

  return taroChooseImagePromise as Promise<ChooseImageSuccessCallbackResult>;
}
