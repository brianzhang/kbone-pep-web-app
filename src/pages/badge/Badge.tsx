import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface BadgeProps extends StyledProps {
  /** 要显示徽章的元素
   *
   * @example
   ```js
      <Badge info="99+">
        <Button>未读消息</Button>
      </Badge>
   ```
   */
  children?: React.ReactNode;

  /**
   * 徽章内容
   */
  info?: React.ReactNode;

  /**
   * 不展示文字，只有一个小红点
   * @default false
   */
  dot?: boolean;

  /**
   * 支持自定义 Badeg 背景颜色
   * @default false
   */
  color?: string;

  /**
   * 支持方形 Badeg 样式
   * @default false
   */
  square?: boolean;
}

export function Badge({
  children,
  info,
  dot,
  color,
  square,
  className,
  style,
}: BadgeProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-badge`, className)}
      style={style}
    >
      {children}
      {dot && <div className={`${classPrefix}-badge__dot`} />}
      {!dot && info && (
        <div 
          className={classNames(`${classPrefix}-badge__info`, {
            [`${classPrefix}-badge__info--square`]: square,
          })}
          style={{ backgroundColor: color }}
        >
          {info}
        </div>
      )}
    </div>
  );
}
