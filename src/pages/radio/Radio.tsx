import React from "react";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";
import { CheckProps, Check, CheckInstance } from "../check";
import { RadioGroup } from "./RadioGroup";

/**
 * Radio 组件所接收的参数
 */
export interface RadioProps extends Omit<CheckProps, "radio" | "type"> {}

export const Radio = forwardRefWithStatics(
  (props: RadioProps, ref: React.MutableRefObject<CheckInstance>) => {
    return <Check ref={ref} radio {...props} />;
  },
  // statics
  {
    Group: RadioGroup,
  }
);
