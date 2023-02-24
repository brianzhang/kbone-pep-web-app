import React from "react";
import classNames from "classnames";
import { ITouchEvent, View, Text } from "@tarojs/components";
import { CommonProps } from "../_type";
import { formatNumber } from "../_util/thousands-separator";
import { StatisticBoard } from "./StatisticBoard";
import { StatisticInfo } from "./StatisticInfo";
import { useConfig } from "../_util/use-config";

export interface StatisticProps extends CommonProps {
  /**
   * 数值标题
   */
  title?: React.ReactNode;

  /**
   * 数值
   */
  value: React.ReactNode;

  /**
   * 数值前缀
   */
  prefix?: React.ReactNode;

  /**
   * 数值单位
   */
  unit?: React.ReactNode;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;
}

export function Statistic({
  title,
  value,
  prefix,
  unit,
  className,
  children,
  ...props
}: StatisticProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-statistic`, className)}
      {...props}
    >
      {title && (
        <div className={`${classPrefix}-statistic__title`}>{title}</div>
      )}
      <div className={`${classPrefix}-statistic__value`}>
        {prefix && (
          <label className={`${classPrefix}-statistic__prefix`}>{prefix}</label>
        )}
        {formatNumber(value)}
        {unit && (
          <label className={`${classPrefix}-statistic__unit`}>{unit}</label>
        )}
      </div>
      {children && (
        <div className={`${classPrefix}-statistic__infos`}>{children}</div>
      )}
    </div>
  );
}

Statistic.Board = StatisticBoard;
Statistic.Info = StatisticInfo;
