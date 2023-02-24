/* eslint-disable camelcase */
import { zh_cn } from "./locale/zh_cn";
import { en_us } from "./locale/en_us";

type Locale = typeof zh_cn;
export interface Translation extends Locale {}

export const translationMap = {
  zh_cn: zh_cn as Translation,
  zh: zh_cn as Translation,
  en_us: { ...zh_cn, ...en_us } as Translation,
  en: { ...zh_cn, ...en_us } as Translation,
};
/* eslint-enable camelcase */
