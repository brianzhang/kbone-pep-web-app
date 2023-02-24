import React from "react";
import classNames from "classnames";
import {
  BaseEventOrig,
  Input as TaroInput,
  StandardProps,
  View,
} from "@tarojs/components";
import { InputProps as TaroInputProps } from "@tarojs/components/types/Input";
import { StyledProps, ControlledProps } from "../_type";
import { useDefaultValue } from "../_util/use-default";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";
import { Textarea } from "./Textarea";
import { noop } from "../_util/noop";
import { useConfig } from "../_util/use-config";

type TInputProps = Omit<
  TaroInputProps,
  | keyof StandardProps
  | "value"
  | "onChange"
  | "type"
  | "password"
  | "autoFocus"
  | "randomNumber"
  | "controlled"
  | "placeholderStyle"
  | "placeholderClass"
>;

export interface InputProps
  extends ControlledProps<
      string,
      BaseEventOrig<TaroInputProps.inputEventDetail>
    >,
    StyledProps,
    TInputProps {
  /**
   * 输入框类型
   * @default "text"
   */
  type?: "text" | "number" | "password" | "idcard" | "digit";
}

export const Input = forwardRefWithStatics(
  function Input(props: InputProps, ref: React.Ref<any>) {
    const { classPrefix } = useConfig();
    const {
      type = "text",
      value,
      onChange,
      onInput = noop,
      className,
      style,
      ...restProps
    } = useDefaultValue(props, "");

    const taroInputProps: TaroInputProps = { ...restProps };
    if (type === "password") {
      taroInputProps.type = "text";
      taroInputProps.password = true;
    } else {
      taroInputProps.type = type;
    }

    return (
      <div 
        className={classNames(
          `${classPrefix}-field`,
          `${classPrefix}-field__input`,
          className,
          {
            "is-disabled": taroInputProps.disabled,
          }
        )}
        style={style}
      >
        <TaroInput
          {...taroInputProps}
          ref={ref}
          className={`${classPrefix}-field__input-item`}
          placeholderClass={`${classPrefix}-field__placeholder`}
          value={value}
          onInput={event => {
            onChange(event.detail.value, { event });
            return onInput(event);
          }}
        />
      </div>
    );
  },
  {
    displayName: "Input",
    Textarea,
  }
);
