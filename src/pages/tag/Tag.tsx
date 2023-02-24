import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { CommonProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface TagProps extends CommonProps {
  /**
   * 颜色主题
   *
   * @default "default"
   */
  type?: "default" | "primary" | "success" | "warning" | "danger";

  /**
   * 圆角式
   * @default false
   */
  round?: boolean;

  /**
   * 轮廓填充样式
   * @default false
   */
  outline?: boolean;

  /**
   * 浅色样式
   * @default false
   */
  light?: boolean;

  // /**
  //  * 标签大小
  //  * @default "sm"
  //  */
  // size?: "sm" | "md" | "lg";
}

export function Tag({
  type = "default",
  round,
  outline,
  light,
  className,
  ...props
}: TagProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-tag`,
        `${classPrefix}-tag--${type}`,
        className,
        {
          [`${classPrefix}-tag--round`]: round,
          [`${classPrefix}-tag--outline`]: !light && outline,
          [`${classPrefix}-tag--light`]: light,
        }
      )}
      {...props}
    />
  );
}
