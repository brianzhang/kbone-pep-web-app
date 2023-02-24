import React from "react";
import classNames from "classnames";
import { getSystemInfoSync } from "@tarojs/taro";
import {
  Textarea as TaroTextarea,
  StandardProps,
  View,
  BaseEventOrig,
  Text,
} from "@tarojs/components";
import { TextareaProps as TaroTextareaProps } from "@tarojs/components/types/Textarea";
import { ControlledProps, StyledProps } from "../_type";
import { useDefaultValue } from "../_util/use-default";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";
import { noop } from "../_util/noop";
import { useConfig } from "../_util/use-config";
import { TaroEnv } from "../_util/env";

const IsWeapp = TaroEnv === "weapp";
const IsIOS = IsWeapp ? getSystemInfoSync().platform === "ios" : false;

type TTextareaProps = Omit<
  TaroTextareaProps,
  | keyof StandardProps
  | "placeholderStyle"
  | "placeholderClass"
  | "value"
  | "onChange"
  | "autoHeight"
>;

export interface TextareaProps
  extends ControlledProps<
      string,
      BaseEventOrig<TaroTextareaProps.onInputEventDetail>
    >,
    TTextareaProps,
    StyledProps {
  /**
   * 输入框高度
   *
   * @default "96px"
   */
  height?: number | string;

  /**
   * 是否显示字数限制
   *
   * 配合 `maxlength` 使用
   * @default false
   */
  count?: boolean;
}

export const Textarea = forwardRefWithStatics(
  function Textarea(props: TextareaProps, ref: React.Ref<any>) {
    const { classPrefix } = useConfig();
    const {
      value,
      onChange,
      count,
      maxlength,
      height = "96px",
      onInput = noop,
      className,
      style,
      ...restProps
    } = useDefaultValue(props, "");

    const normalTextarea = ({
      isHideIosPadding = false,
    }: {
      isHideIosPadding?: boolean;
    }) => {
      return (
        <div 
          className={classNames(
            `${classPrefix}-field`,
            `${classPrefix}-field__textarea`,
            className,
            {
              [`${classPrefix}-field__ios`]: isHideIosPadding,
            }
          )}
          style={style}
        >
          <TaroTextarea
            {...restProps}
            ref={ref}
            holdKeyboard
            disableDefaultPadding
            className={classNames(`${classPrefix}-field__textarea-item`)}
            style={{ height }}
            placeholderClass={`${classPrefix}-field__placeholder`}
            value={value}
            onInput={event => {
              onChange(event.detail.value, { event });
              return onInput(event);
            }}
            maxlength={maxlength}
          />
          {count && maxlength > 0 && (
            <div className={`${classPrefix}-field__textarea-counter`}>
              <label className={`${classPrefix}-field__textarea-current`}>
                {value.length}
              </label>{" "}
              / {maxlength}
            </div>
          )}
        </div>
      );
    };

    /** 小程序ios下textarea组件存在默认padding，taro组件未实现disableDefaultPadding，需要特殊适配 */
    if (IsWeapp && IsIOS) {
      return (
        <div style={{ width: "100%", overflow: "hidden" }}>
          {normalTextarea({ isHideIosPadding: true })}
        </div>
      );
    }

    return normalTextarea({ isHideIosPadding: false });
  },
  {
    displayName: "Textarea",
  }
);
