import React from "react";
import classNames from "classnames";
import { View, Image } from "@tarojs/components";
import { CommonEventFunction } from "@tarojs/components/types/common";
import { pxTransform } from "../_util/px-transform";
import { StyledProps } from "../_type";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

/**
 * Icon 组件支持的属性
 */
export interface IconProps extends StyledProps {
  /**
   * 图标大小
   * @default 48 (750)
   */
  size?: number | string;

  /**
   * 图标名称，支持传入图标名称或图片链接
   */
  name?: string;

  /**
   * 图标颜色，hex 值
   */
  color?: string;

  /**
   * 自定义渲染内容
   */
  render?: (props: Pick<IconProps, "size" | "color">) => React.ReactNode;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 点击回调函数
   */
  onClick?: CommonEventFunction;
}

export function Icon({
  size = TaroEnv ? 48 : 24,
  name = "",
  render,
  color,
  className,
  style = {},
  ...props
}: IconProps) {
  const { classPrefix } = useConfig();
  // 判断属性 name 的值是否为 url
  const src = name.indexOf("/") !== -1 ? name : null;

  // 生成样式
  const genStyle = (
    styleProps: IconProps & { src?: string }
  ): React.CSSProperties => {
    const { size, color, src } = styleProps;
    const sizeStyle: React.CSSProperties = src
      ? {
          width: typeof size === "number" ? pxTransform(size, 750) : size,
          height: typeof size === "number" ? pxTransform(size, 750) : size,
        }
      : {
          fontSize: typeof size === "number" ? pxTransform(size, 750) : size,
        };
    const colorStyle: React.CSSProperties = { color };
    return { ...sizeStyle, ...colorStyle };
  };

  if (render) {
    const renderProps = {
      size: typeof size === "number" ? pxTransform(size, 750) : size,
      color,
    };
    return (
      <div 
        className={classNames(`${classPrefix}-icon`, className)}
        style={style}
      >
        {render(renderProps)}
      </div>
    );
  }

  return src ? (
    <div 
      className={classNames(`${classPrefix}-icon`, className)}
      style={style}
      {...props}
    >
      <Image
        src={src}
        style={genStyle({ size, color, src })}
        mode="aspectFill"
      />
    </div>
  ) : (
    <div 
      className={classNames(
        `${classPrefix}-icon`,
        `${classPrefix}-icon-${name}`,
        className
      )}
      style={{ ...style, ...genStyle({ size, color }) }}
      {...props}
    />
  );
}
