/* eslint-disable no-param-reassign */
import React from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { StyledProps } from "../_type";
import { useConfig } from "../_util/use-config";

export interface ProgressProps extends StyledProps {
  /**
   * 状态
   * @default "default"
   */
  status?: "default" | "success" | "danger" | "disabled";

  /**
   * 百分比，取值 [0, 100]
   * @default 0
   */
  percent?: number;

  /**
   * 自定义描述内容
   * @default percent => `${percent}%`
   */
  formatter?: (percent: number) => React.ReactNode;
}

const defaultFormatter = i => `${i}%`;

export function Progress({
  status,
  percent = 0,
  className,
  formatter = defaultFormatter,
  ...props
}: ProgressProps) {
  const { classPrefix } = useConfig();
  if (percent < 0 || percent > 100) {
    console.error("Progress component 'percent' property limit to 0 ~ 100");
  }

  percent = Math.min(percent, 100);
  percent = Math.max(percent, 0);

  if (!status) {
    if (percent >= 100) {
      status = "success";
    } else {
      status = "default";
    }
  }

  const text = formatter(percent);

  return (
    <div 
      className={classNames(
        `${classPrefix}-progress`,
        className,
        `is-${status}`
      )}
      {...props}
    >
      <div className={`${classPrefix}-progress__bar`}>
        <div 
          className={`${classPrefix}-progress__bar-inner`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {text && <label className={`${classPrefix}-progress__value`}>{text}</label>}
    </div>
  );
}
