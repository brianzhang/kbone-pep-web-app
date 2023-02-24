/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/input/input.tsx
 */
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { CommonEventFunction, StandardProps } from "../types/common";
import { ControlledProps } from "../../../_type";
import { noop } from "../../../_util/noop";
import { useDefaultValue } from "../../../_util/use-default";
import { mergeRefs } from "../../../_util/merge-refs";
import { createEvent } from "../_util/create-event";

export interface InputProps extends ControlledProps<string>, StandardProps {
  name?: string;

  /**
   * 输入框类型
   * @default "text"
   */
  type?: "text" | "number" | "password" | "idcard" | "digit";

  /**
   * 是否是密码类型
   */
  password?: boolean;

  /** 设置键盘右下角按钮的文字
   * @default "done"
   */
  confirmType?: "send" | "search" | "next" | "go" | "done";

  /**
   * 输入框为空时占位符
   */
  placeholder?: string;

  /** 是否禁用
   */
  disabled?: boolean;

  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   * @default 140
   */
  maxlength?: number;

  /**
   * (即将废弃，请直接使用 focus )自动聚焦，拉起键盘
   * @default false
   */
  autoFocus?: boolean;

  /**
   * 获取焦点
   */
  focus?: boolean;

  /**
   * 当键盘输入时触发
   * event.detail = {value, cursor, keyCode}
   * 处理函数可以直接 return 一个字符串，将替换输入框的内容
   */
  onInput?: CommonEventFunction;

  /**
   * 当键盘按下时触发
   */
  onKeyDown?: CommonEventFunction;

  /**
   * 输入框聚焦时触发
   * event.detail = { value, height }，height 为键盘高度
   */
  onFocus?: CommonEventFunction;

  /**
   * 输入框失去焦点时触发
   * vent.detail = {value: value}
   */
  onBlur?: CommonEventFunction;

  /**
   * 点击完成按钮时触发
   * event.detail = {value: value}
   */
  onConfirm?: CommonEventFunction;

  placeholderClass?: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace InputProps {
  export interface inputEventDetail {
    value: string;
  }
  export interface inputValueEventDetail {
    value: string;
  }
}

function getInputType(
  type: InputProps["type"],
  confirmType: InputProps["confirmType"],
  password: boolean
): string {
  let inputType: string = type;
  if (typeof type === "undefined") {
    return "text";
  }
  if (!type) {
    throw new Error("unexpected type");
  }
  if (confirmType === "search") {
    inputType = "search";
  }
  if (password) {
    inputType = "password";
  }
  if (type === "digit") {
    inputType = "number";
  }

  return inputType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      type,
      password,
      confirmType = "done",
      maxlength = 140,
      value,
      onInput = noop,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      onKeyDown = noop,
      onConfirm = noop,
      focus,
      autoFocus = focus,
      className,
      style,
      disabled,
      placeholder,
      id,
      name,
    } = useDefaultValue(props, "");

    const inputType = getInputType(type, confirmType, password);
    const composingRef = useRef(false);
    // const inputExecutedRef = useRef(false);

    // 记录 `composition` 事件过程中值以实现受控
    const [composingRefValue, setComposingValue] = useState<string>("");

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      id,
      name,
      disabled,
      placeholder,
      autoFocus,
      type: inputType,
      maxLength: maxlength,
      value: composingRef.current ? composingRefValue : value,
      onChange: event => {
        event.stopPropagation();
        if (composingRef.current) {
          setComposingValue(event.currentTarget.value);
        } else {
          let { value } = event.currentTarget;
          // number 类型 maxlength 无效
          if (inputType === "number" && value && value.length >= maxlength) {
            value = value.substring(0, maxlength);
            event.target.value = value;
          }

          onInput(createEvent(event, { value }));
          onChange(event.currentTarget.value, { event: event as any });
        }
      },
      onInput: event => {
        event.stopPropagation();
      },
      onCompositionStart: event => {
        if (!event.target) {
          return;
        }
        composingRef.current = true;
      },
      onCompositionEnd: event => {
        if (!event.target) {
          return;
        }
        if (composingRef.current) {
          composingRef.current = false;
          onInput(createEvent(event, { value: event.currentTarget.value }));
          onChange(event.currentTarget.value, { event: event as any });
        }
        setComposingValue("");
      },
      onFocus: event => {
        onFocus(createEvent(event, { value: event.target.value }));
      },
      onBlur: event => {
        onBlur(createEvent(event, { value: event.target.value }));
      },
      onKeyDown: event => {
        event.stopPropagation();
        onKeyDown(event);
        if (event.key === "Enter") {
          onConfirm(createEvent(event, { value: event.currentTarget.value }));
        }
      },
    };

    return (
      <div className={classNames(className)} style={style}>
        <input
          className="tea-core-input"
          ref={mergeRefs(ref, input => {
            if (autoFocus) {
              input?.focus();
            }
          })}
          {...inputProps}
        />
      </div>
    );
  }
);
