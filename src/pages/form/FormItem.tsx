import React, { useContext, useMemo, useRef } from "react";
import classNames from "classnames";
import { ITouchEvent, Label, View } from "@tarojs/components";
import { pxTransform } from "../_util/px-transform";
import { CommonProps } from "../_type";
import { Icon } from "../icon";
import { isChildOfType } from "../_util/is-child-of-type";
import { Checkbox } from "../checkbox";
import { Radio } from "../radio";
import { CheckInstance } from "../check";
import { FormContext } from "./FormContext";
import { useConfig } from "../_util/use-config";

export interface FormItemProps extends CommonProps {
  /**
   * 表单项说明
   */
  label?: React.ReactNode;

  // /**
  //  * 绑定控件的 id
  //  */
  // for?: string;

  /**
   * 表单项 label 部分的宽度
   * @default "6em"
   */
  labelWidth?: number | string;

  /**
   * 是否为必填项
   * @default false
   */
  required?: boolean;

  /**
   * 是否使用垂直布局
   * @default false
   */
  vertical?: boolean;

  /**
   * 是否显示箭头
   * @default false
   */
  arrow?: boolean;

  /**
   * 是否为异常状态
   *
   * 当传递非 `boolean` 值时将作为异常样式 `message` 展示
   */
  error?: boolean | React.ReactNode;

  /**
   * 表单项说明消息/错误消息
   */
  message?: React.ReactNode;

  /**
   * 表单项尾部额外内容
   */
  extra?: React.ReactNode;

  /**
   * 表单项内容为空时显示的内容
   */
  placeholder?: React.ReactNode;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;
}

export function FormItem({
  label,
  // for: htmlFor,
  labelWidth,
  arrow,
  error,
  required,
  message,
  placeholder,
  extra,
  vertical,
  children,
  className,
  style,
  onClick,
}: FormItemProps) {
  const { classPrefix } = useConfig();
  const { labelWidth: formLabelWidth } = useContext(FormContext);

  const itemLabelWidth = useMemo(() => {
    const width = labelWidth || formLabelWidth || "6em";
    return typeof width === "number" ? pxTransform(width, 750) : width;
  }, [labelWidth, formLabelWidth]);

  const ref = useRef<CheckInstance>(null);
  // children 包含 Check 时整行可点击
  if (isChildOfType(children, Checkbox) || isChildOfType(children, Radio)) {
    // eslint-disable-next-line no-param-reassign
    children = React.cloneElement(children, { ref });
    // eslint-disable-next-line no-param-reassign
    onClick = event => {
      ref.current && ref.current.trigger(event);
    };
  }

  if (error && typeof error !== "boolean") {
    // eslint-disable-next-line no-param-reassign
    message = error;
  }

  return (
    <div 
      className={classNames(
        `${classPrefix}-form-item`,
        `${classPrefix}-item`,
        `${classPrefix}-hairline--bottom`,
        "size-auto",
        className,
        {
          "is-clickable": arrow || onClick,
          "is-required": required,
          [`${classPrefix}-form-item--vertical`]: vertical,
          [`${classPrefix}-form-item--invalid`]: error,
        }
      )}
      style={style}
      onClick={onClick}
    >
      {typeof label !== "undefined" && (
        <div 
          className={`${classPrefix}-item__body`}
          style={{
            maxWidth: itemLabelWidth,
            minWidth: itemLabelWidth,
          }}
        >
          <Label
            className={`${classPrefix}-item__title ${classPrefix}-form-item__label`}
            // for={htmlFor}
          >
            {label}
          </Label>
        </div>
      )}
      <div 
        className={`${classPrefix}-item__value ${classPrefix}-form-item__value`}
      >
        <div className={`${classPrefix}-form-item__controls`}>
          {children || (
            <div className={`${classPrefix}-form-item__placeholder`}>
              {placeholder}
            </div>
          )}
          <div className={`${classPrefix}-form-item__extra`}>{extra}</div>
        </div>
        {message && (
          <div 
            className={
              error
                ? `${classPrefix}-form-item__invalid-text`
                : `${classPrefix}-form-item__helper-text`
            }
          >
            {message}
          </div>
        )}
      </div>
      {arrow && (
        <Icon
          className={`${classPrefix}-item__detail-icon`}
          name="chevronright"
          color="#bbbbbb"
        />
      )}
    </div>
  );
}
