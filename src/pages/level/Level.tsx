import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { pxTransform } from "../_util/px-transform";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface LevelProps extends StyledProps {
  /**
   * 设置 start 的 flex 属性值
   * @default "none"
   */
  startFlex?: "none" | "1";

  /**
   * 设置 end 的 flex 属性值
   * @default "none"
   */
  endFlex?: "none" | "1";

  /**
   * 设置 start 的宽度
   * @default "auto"
   */
  startWidth?: number | string;

  /**
   * 设置 end 的宽度
   * @default "auto"
   */
  endWidth?: number | string;

  /**
   * 开始内容
   */
  start?: React.ReactNode;

  /**
   * 中间内容
   */
  children?: React.ReactNode;

  /**
   * 结束内容
   */
  end?: React.ReactNode;
}

export function Level({
  startFlex = "none",
  endFlex = "none",
  startWidth = "auto",
  endWidth = "auto",
  start,
  end,
  children,
  className,
  ...props
}: LevelProps) {
  const { classPrefix } = useConfig();
  const startStyle: React.CSSProperties = {};
  const endStyle: React.CSSProperties = {};

  if (startFlex && typeof startFlex === "string") {
    Object.assign(startStyle, { flex: startFlex });
  }

  if (startWidth !== "auto") {
    Object.assign(startStyle, {
      flexBasis:
        typeof startWidth === "number"
          ? pxTransform(startWidth, 750)
          : startWidth,
    });
  }

  if (endFlex && typeof endFlex === "string") {
    Object.assign(endStyle, { flex: endFlex });
  }

  if (endWidth !== "auto") {
    Object.assign(endStyle, {
      flexBasis:
        typeof endWidth === "number" ? pxTransform(endWidth, 750) : endWidth,
    });
  }

  return (
    <div className={classNames(`${classPrefix}-level`, className)} {...props}>
      <div className={`${classPrefix}-level__start`} style={startStyle}>
        {start}
      </div>
      <div className={`${classPrefix}-level__center`}>{children}</div>
      <div className={`${classPrefix}-level__end`} style={endStyle}>
        {end}
      </div>
    </div>
  );
}
