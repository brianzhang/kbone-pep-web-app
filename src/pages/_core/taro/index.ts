import { noop } from "../../_util/noop";
import { upload, chooseImage as choose } from "./upload";

export const useReady = noop;
export const nextTick = noop;
export const pxTransform = noop;
export const getSystemInfoSync = noop;
export const uploadFile = upload;
export const chooseImage = choose;

const Taro = {
  useReady,
  nextTick,
  pxTransform,
  getSystemInfoSync,
  uploadFile,
  chooseImage,
};

export default Taro;
