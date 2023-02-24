import React, { useEffect } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { pxTransform } from "../_util/px-transform";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";
import { uuid } from "../_util/uuid";

/**
 * Loading 组件支持的属性
 */
export interface LoadingProps extends StyledProps {
  /**
   * 加载图标颜色
   * @default "#006eff"
   */
  color?: string;

  /**
   * 加载图标大小
   * @default 40 (750)
   */
  size?: number | string;

  /**
   * 文字内容
   */
  children?: React.ReactNode;

  /**
   * 是否垂直排列图标和文字内容
   * @default false
   */
  vertical?: boolean;
}

let onAppear: LoadingEventHandler = null;
let onDisappear: LoadingEventHandler = null;
export function Loading({
  vertical,
  size,
  color,
  className,
  style = {},
  children,
}: LoadingProps) {
  const { classPrefix } = useConfig();

  useEffect(() => {
    const loadid = uuid();
    onAppear?.(loadid);
    return () => {
      onDisappear?.(loadid);
    };
  }, []);

  return (
    <div 
      className={classNames(`${classPrefix}-loading`, className, {
        [`${classPrefix}-loading--vertical`]: vertical,
      })}
      style={style}
    >
      <div 
        className={`${classPrefix}-loading__icon`}
        style={
          size
            ? {
                color,
                width: typeof size === "number" ? pxTransform(size, 750) : size,
                height:
                  typeof size === "number" ? pxTransform(size, 750) : size,
              }
            : { color }
        }
      >
        <div className={`${classPrefix}-loading--circular`} />
      </div>
      <div className={`${classPrefix}-loading__text`}>{children}</div>
    </div>
  );
}

interface LoadingEventHandler {
  (loadid: string): void;
}

Loading.on = (
  event: "appear" | "disappear",
  eventHandler: LoadingEventHandler
) => {
  switch (event) {
    case "appear":
      if (!onAppear) {
        onAppear = eventHandler;
      }
      break;
    case "disappear":
      if (!onDisappear) {
        onDisappear = eventHandler;
      }
      break;
  }
};
