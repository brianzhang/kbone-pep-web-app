import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { CommonProps } from "../_type/StyledProps";
import { useConfig } from "../_util/use-config";

export interface TypographyHeadingProps extends CommonProps {
  /**
   * 标题级别
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5;

  /**
   * 是否启用溢出省略
   */
  ellipsis?: boolean;
}

export function TypographyHeading({
  level = 1,
  ellipsis,
  className,
  ...props
}: TypographyHeadingProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-typography`,
        `${classPrefix}-heading`,
        `level-h${level}`,
        className,
        {
          [`${classPrefix}-ellipsis`]: ellipsis,
        }
      )}
      {...props}
    />
  );
}
