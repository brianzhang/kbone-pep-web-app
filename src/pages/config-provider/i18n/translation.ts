/* eslint-disable camelcase */
import { useConfig } from "../../_util/use-config";
import { getGlobalConfig } from "../ConfigProvider";
import { zh_cn } from "./locale/zh_cn";
import { translationMap, Translation } from "./translationMap";

export function useTranslation(): Translation {
  const { locale: configLocale } = useConfig();
  const globalConfig = getGlobalConfig();
  return (
    translationMap[globalConfig?.locale] ||
    translationMap[configLocale] ||
    zh_cn
  );
}
/* eslint-enable camelcase */
