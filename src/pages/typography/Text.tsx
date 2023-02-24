import React from "react";
import classNames from "classnames";
import {
  Text,
  View,
  Navigator,
  StandardProps,
  ITouchEvent,
} from "@tarojs/components";
import { NavigatorProps } from "@tarojs/components/types/Navigator";
import { CommonProps } from "../_type/StyledProps";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

const themeMap = {
  default: "",
  light: "--light",
  disabled: "--disabled",
  primary: "--primary",
  success: "--success",
  warning: "--warning",
  danger: "--danger",
};

export interface TypographyTextProps extends CommonProps {
  /**
   * 文本的颜色主题
   *
   * @default "default"
   */
  theme?:
    | "default"
    | "light"
    | "disabled"
    | "primary"
    | "success"
    | "warning"
    | "danger";

  /**
   * 文字大小
   *
   * @default "md"
   */
  size?: "lg" | "md" | "sm" | "xs" | "xxs";

  /**
   * 是否启用溢出省略
   */
  ellipsis?: boolean;

  /**
   * 是否渲染为块级元素
   * @default false
   */
  block?: boolean;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;
}

export function TypographyText({
  theme = "default",
  block,
  ellipsis,
  size,
  className,
  ...props
}: TypographyTextProps) {
  const { classPrefix } = useConfig();

  return (
    <div 
      className={classNames(
        `${classPrefix}-typography`,
        `${classPrefix}-text`,
        `${classPrefix}-text${themeMap[theme] || ""}`,
        { [`${classPrefix}-text__block`]: block || ellipsis },
        { [`size-${size}`]: size },
        className,
        {
          [`${classPrefix}-ellipsis`]: ellipsis,
        }
      )}
      {...props}
    />
  );
}

/**
 * 超链接组件
 * - 在 H5 环境渲染为 `<a>`
 * - 在小程序环境渲染为 `<Navigator>`
 */
export interface TypographyLinkProps
  extends Pick<TypographyTextProps, "size" | "onClick">,
    CommonProps,
    Omit<NavigatorProps, "url" | "target" | keyof StandardProps> {
  /**
   * 跳转链接
   */
  url?: string;

  /**
   * 发生跳转的目标
   *
   * - 小程序端：`"self" | "miniProgram"`
   * @default "self"
   */
  target?: string;
}

export function TypographyLink({
  size,
  className,
  url,
  children,
  ...props
}: TypographyLinkProps) {
  const { classPrefix } = useConfig();
  if (!TaroEnv || TaroEnv === "h5") {
    return (
      // eslint-disable-next-line react/forbid-elements
      <a
        className={classNames(
          `${classPrefix}-typography`,
          `${classPrefix}-text`,
          `${classPrefix}-text--link`,
          `${classPrefix}-link`,
          { [`size-${size}`]: size },
          className
        )}
        href={url}
        {...(props as any)}
      >
        {children}
      </a>
    );
  }

  return (
    <Navigator
      className={classNames(
        `${classPrefix}-typography`,
        `${classPrefix}-text`,
        `${classPrefix}-text--link`,
        `${classPrefix}-link`,
        { [`size-${size}`]: size },
        className
      )}
      url={url}
      {...(props as any)}
    >
      {children}
    </Navigator>
  );
}
