import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface WhiteSpaceProps extends StyledProps {
  /**
   * `children` 内容两侧将会被留白
   */
  children?: React.ReactNode;

  /**
   * 为 `<Button fixed />` 等贴底组件上部预留空间
   * @default false
   */
  bottom?: boolean;
}

export function WhiteSpace({ className, bottom, ...props }: WhiteSpaceProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-whitespace`, {
        [`${classPrefix}-whitespace--bottom`]: bottom,
      })}
      {...props}
    />
  );
}
