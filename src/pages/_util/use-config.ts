import { useContext } from "react";
import { ConfigContext, Config } from "../config-provider/ConfigContext";

export function useConfig(): Config {
  const context = useContext(ConfigContext) || {};
  return {
    classPrefix: "tea",
    locale: "zh",
    ...context,
  };
}
