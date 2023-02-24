import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { ITouchEvent } from "@tarojs/components/types/common";
import { pxTransform } from "../_util/px-transform";
import { Loading } from "../loading";
import { noop } from "../_util/noop";
import { useDefault } from "../_util/use-default";
import { StyledProps, ChangeContext } from "../_type";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

/**
 * Switch 组件支持的属性
 */
export interface SwitchProps extends StyledProps {
  /**
   * 开关选中状态
   */
  checked?: boolean;

  /**
   * 开关默认选中状态
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * 点击回调函数
   */
  onChange?: (
    checked: boolean,
    context: ChangeContext<ITouchEvent<any>>
  ) => void;

  /**
   * 是否为禁用状态
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否为加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 开关大小
   * @default 56 (750)
   */
  size?: number;

  /**
   * 开关打开时的背景颜色
   * @default "#006EFF"
   */
  color?: string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange: onCheckedChange = noop,
  disabled = false,
  loading = false,
  size = TaroEnv ? 56 : 28,
  color = "#006EFF",
  className,
  style = {},
}: SwitchProps) {
  const { classPrefix } = useConfig();
  const [value, onChange] = useDefault(
    checked,
    defaultChecked,
    onCheckedChange
  );

  return (
    <div 
      style={{
        width: pxTransform(size + (TaroEnv ? 40 : 20), 750),
        height: pxTransform(size, 750),
        borderRadius: pxTransform(size / 2, 750),
        backgroundColor: `${!disabled && value ? color : ""}`,
        ...style,
      }}
      className={classNames(`${classPrefix}-switch`, className, {
        "is-checked": value,
        "is-disabled": disabled,
      })}
      onClick={event => {
        if (disabled) return;
        onChange(!value, { event });
      }}
    >
      <div 
        className={classNames(`${classPrefix}-switch__toggle`, {
          "is-loading": loading,
        })}
        style={{
          width: pxTransform(size - (TaroEnv ? 8 : 4), 750),
          height: pxTransform(size - (TaroEnv ? 8 : 4), 750),
        }}
      >
        {loading && <Loading style={{ color: "#006EFF" }} />}
      </div>
    </div>
  );
}
