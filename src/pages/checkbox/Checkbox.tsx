import React from "react";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";
import { CheckProps, Check, CheckInstance } from "../check";
import { CheckboxGroup } from "./CheckboxGroup";

/**
 * Checkbox 组件所接收的参数
 */
export interface CheckboxProps extends Omit<CheckProps, "radio"> {}

export const Checkbox = forwardRefWithStatics(
  (props: CheckboxProps, ref: React.MutableRefObject<CheckInstance>) => {
    return <Check ref={ref} {...props} />;
  },
  // statics
  {
    Group: CheckboxGroup,
  }
);
