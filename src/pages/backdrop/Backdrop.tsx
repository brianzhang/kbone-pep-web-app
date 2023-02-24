import React from "react";
import { ITouchEvent, View } from "@tarojs/components";
import classNames from "classnames";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface BackdropProps extends StyledProps {
  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * 是否设置为透明
   */
  transparent?: boolean;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;
}

export function Backdrop({
  visible,
  className,
  transparent,
  onClick,
  style,
  ...props
}: BackdropProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      {...props}
      className={classNames(`${classPrefix}-backdrop`, className, {
        "is-shown": visible,
        transparent,
      })}
    >
      <div 
        className={`${classPrefix}-backdrop__overlay`}
        onClick={onClick}
        style={style}
      />
    </div>
  );
}
