import { pxTransform as TaroPxTransform } from "@tarojs/taro";
import { TaroEnv } from "./env";

export const pxTransform = (size: number, designWidth: number) => {
  if (TaroEnv) {
    return TaroPxTransform(size, designWidth);
  }
  return `${size}px`;
};
