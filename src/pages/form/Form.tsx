import React from "react";
import classNames from "classnames";
import {
  CommonEventFunction,
  Form as TaroForm,
  StandardProps,
  View,
} from "@tarojs/components";
import { FormProps as TaroFormProps } from "@tarojs/components/types/Form";
import { CommonProps } from "../_type";
import { FormItem } from "./FormItem";
import { FormDivider } from "./FormDivider";
import { FormContext } from "./FormContext";
import { useConfig } from "../_util/use-config";

type TFormProps = Omit<
  TaroFormProps,
  keyof StandardProps | "onSubmit" | "onReset"
>;

export interface FormProps extends CommonProps, TFormProps {
  /**
   * 标题
   */
  title?: React.ReactNode;

  // /**
  //  * 表单布局方式
  //  */
  // layout?: "default" | "vertical";

  /**
   * 表单项 label 部分的宽度
   * @default "6em"
   */
  labelWidth?: number | string;

  /**
   * 表单提交事件
   */
  onSubmit?: CommonEventFunction;

  /**
   * 表单提交事件
   */
  onReset?: CommonEventFunction;
}

export function Form({
  children,
  title,
  labelWidth,
  className,
  style,
  ...props
}: FormProps) {
  const { classPrefix } = useConfig();
  return (
    <TaroForm {...props}>
      <div 
        className={classNames(`${classPrefix}-form`, className)}
        style={style}
      >
        {typeof title !== "undefined" && (
          <div className={`${classPrefix}-form__title`}>{title}</div>
        )}
        <div className={classNames(`${classPrefix}-form__wrap`)}>
          <FormContext.Provider value={{ labelWidth }}>
            {children}
          </FormContext.Provider>
        </div>
      </div>
    </TaroForm>
  );
}

function FormTitle({ className, ...props }: CommonProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-form__title`, className)}
      {...props}
    />
  );
}

Form.Title = FormTitle;
Form.Item = FormItem;
Form.Divider = FormDivider;
