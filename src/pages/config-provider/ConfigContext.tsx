import { createContext } from "react";

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default "tea"
   */
  classPrefix?: string;

  /**
   * 组件语言版本
   *
   * @default "zh"
   */
  locale?: "zh" | "en";
}

export const ConfigContext = createContext<Config>({
  classPrefix: "tea",
  locale: "zh",
});
