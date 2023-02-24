import React from "react";
import classNames from "classnames";
import { Button as TaroButton, View } from "@tarojs/components";
import { CommonEventFunction } from "@tarojs/components/types/common";
import { ButtonProps as TaroButtonProps } from "@tarojs/components/types/Button";
import { StyledProps } from "../_type";
import { Loading } from "../loading";
import { Icon, IconProps } from "../icon";
import { useConfig } from "../_util/use-config";

type TButtonProps = Pick<
  TaroButtonProps,
  | "className"
  | "style"
  | "formType"
  | "openType"
  | "lang"
  | "sessionFrom"
  | "sendMessageTitle"
  | "sendMessagePath"
  | "sendMessageImg"
  | "appParameter"
  | "onContact"
  | "onGetUserInfo"
  | "onGetPhoneNumber"
  | "onOpenSetting"
  | "onError"
  | "onLaunchapp"
  | "onGetRealnameAuthInfo"
> & {
  /** 显示会话内消息卡片
   *
   * 生效时机：`open-type="contact"`
   * @default false
   * @supported weapp
   */
  showMessageCard?: boolean;
};

/**
 * Button 组件支持的属性
 */
export interface ButtonProps extends TButtonProps {
  /**
   * 按钮样式类型
   * @default "default"
   */
  type?: "default" | "primary";
  // | "secondary"

  /**
   * 是否固定在底部
   * @default false
   */

  fixed?: boolean;

  /**
   * 是否为危险样式按钮
   * @default false
   */
  danger?: boolean;

  /**
   * 设置文本样式按钮
   * @default false
   */
  text?: boolean;

  /**
   * 前置图标
   */
  icon?: string | IconProps;

  /**
   * 按钮大小
   * @default "lg"
   */
  size?: "sm" | "md" | "lg";

  /**
   * 设置按钮为禁用状态
   * @default false
   */
  disabled?: boolean;

  /**
   * 设置按钮为加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 设置按钮为加载中文案
   */
  loadingText?: React.ReactNode;

  // /**
  //  * 幽灵样式，按钮背景透明
  //  * @default false
  //  */
  // ghost?: boolean;

  /**
   * 点击回调函数
   */
  onClick?: CommonEventFunction;

  /**
   * 按钮内容
   */
  children?: React.ReactNode;
}

export function Button({
  type = "default",
  fixed = false,
  size = "lg",
  className,
  children,
  danger,
  text,
  disabled,
  loading,
  loadingText,
  icon,
  ...props
}: ButtonProps) {
  const { classPrefix } = useConfig();

  const iconProps = typeof icon === "string" ? { name: icon } : icon;
  return (
    <TaroButton
      disabled={disabled}
      className={classNames(
        `${classPrefix}-button`,
        `${classPrefix}-button--${type}`,
        `size-${size}`,
        className,
        {
          [`${classPrefix}-button--fixed`]: fixed,
          [`${classPrefix}-button--danger`]: danger,
          [`${classPrefix}-button--solid`]: !text,
          [`${classPrefix}-button--text`]: text,
          // [`${classPrefix}-button--outline`]: ghost,
          "is-disabled": disabled,
          "is-loading": loading,
        }
      )}
      {...props}
    >
      {loading ? (
        <div>
          <Loading className={`${classPrefix}-button__icon`} />
          {loadingText && (
            <div className={`${classPrefix}-button__icon-text`}>
              {loadingText}
            </div>
          )}
        </div>
      ) : (
        <div>
          {iconProps ? (
            <div>
              <Icon
                {...iconProps}
                className={classNames(
                  `${classPrefix}-button__icon`,
                  iconProps.className
                )}
              />
              {children && (
                <div className={`${classPrefix}-button__icon-text`}>
                  {children}
                </div>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </TaroButton>
  );
}

export interface ButtonGroupProps extends StyledProps {
  /**
   * 按钮组的排列类型
   */
  type?: "horizontal" | "vertical" | "fixed" | "operational";

  /**
   * 按钮组自定义内容
   */
  content?: React.ReactNode;

  /**
   * 按钮组内容
   */
  children?: React.ReactNode;
}

Button.Group = function ButtonGroup({
  className,
  type = "vertical",
  content,
  children,
  ...props
}: ButtonGroupProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-button-group`,
        `${classPrefix}-button-group--${type}`,
        className,
        {
          "with-content": content,
        }
      )}
      {...props}
    >
      {content && (
        <div className={`${classPrefix}-button-group__content`}>
          {content}
        </div>
      )}
      {children}
    </div>
  );
};
