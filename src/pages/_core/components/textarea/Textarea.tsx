/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/textarea/textarea.tsx
 */
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { CommonEventFunction, StandardProps } from "../types/common";
import { ControlledProps } from "../../../_type";
import { noop } from "../../../_util/noop";
import { useDefaultValue } from "../../../_util/use-default";
import { mergeRefs } from "../../../_util/merge-refs";
import { createEvent } from "../_util/create-event";

export interface TextareaProps extends ControlledProps<string>, StandardProps {
  name?: string;

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

  holdKeyboard?: boolean;
  disableDefaultPadding?: boolean;
  placeholderClass?: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TextareaProps {
  export interface onInputEventDetail {
    value: string;
  }
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
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

    const composingRef = useRef(false);
    // const textareaExecutedRef = useRef(false);

    // 记录 `composition` 事件过程中值以实现受控
    const [composingRefValue, setComposingValue] = useState<string>("");

    const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
      id,
      name,
      disabled,
      placeholder,
      autoFocus,
      maxLength: maxlength,
      value: composingRef.current ? composingRefValue : value,
      onChange: event => {
        event.stopPropagation();
        if (composingRef.current) {
          setComposingValue(event.currentTarget.value);
        } else {
          const { value } = event.currentTarget;
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
        <textarea
          className="tea-core-textarea"
          ref={mergeRefs(ref, textarea => {
            if (autoFocus) {
              textarea?.focus();
            }
          })}
          {...textareaProps}
        />
      </div>
    );
  }
);
