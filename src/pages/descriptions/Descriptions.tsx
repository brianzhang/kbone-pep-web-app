import React, { useContext } from "react";
import classNames from "classnames";
import { ITouchEvent, View } from "@tarojs/components";
import { CommonProps } from "../_type";
import { Level } from "../level";
import { DescriptionsContext } from "./DescriptionsContext";
import { Icon } from "../icon";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface DescriptionsProps extends CommonProps {
  /**
   * 描述项 label 部分的宽度
   *
   * @default "6em"
   */
  labelWidth?: number | string;

  /**
   * 描述项 extra 部分的宽度
   *
   * @default "4em"
   */
  extraWidth?: number | string;
}

export function Descriptions({
  labelWidth,
  extraWidth,
  className,
  ...props
}: DescriptionsProps) {
  const { classPrefix } = useConfig();
  return (
    <DescriptionsContext.Provider value={{ labelWidth, extraWidth }}>
      <div 
        className={classNames(`${classPrefix}-descriptions`, className)}
        {...props}
      />
    </DescriptionsContext.Provider>
  );
}

export interface DescriptionItemProps extends CommonProps {
  /**
   * 描述项说明
   */
  label?: React.ReactNode;

  /**
   * 内容是否显示为包含箭头的跳转项
   * @default false
   */
  arrow?: boolean;

  /**
   * 描述项尾部额外内容
   */
  extra?: React.ReactNode;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;

  /**
   * 描述项 label 部分的宽度
   * @default "6em"
   */
  labelWidth?: number | string;

  /**
   * 描述项 extra 部分的宽度
   *
   * @default "4em"
   */
  extraWidth?: number | string;
}

export function DescriptionItem({
  labelWidth,
  extraWidth,
  label,
  arrow,
  extra,
  children,
  className,
  onClick,
  style = {},
  ...props
}: DescriptionItemProps) {
  const { classPrefix } = useConfig();
  const {
    labelWidth: globalLabelWidth,
    extraWidth: globalExtraWidth,
  } = useContext(DescriptionsContext);

  return (
    <Level
      className={classNames(`${classPrefix}-descriptions__item`, className)}
      // em 在 H5 和小程序下表现不一致
      style={{ fontSize: TaroEnv === "weapp" ? "24rpx" : undefined, ...style }}
      {...props}
      start={
        <div className={`${classPrefix}-descriptions__label`}>{label}</div>
      }
      startWidth={labelWidth ?? globalLabelWidth ?? "6em"}
      end={extra}
      endWidth={arrow ? 0 : extraWidth ?? globalExtraWidth ?? "4em"}
    >
      <div 
        className={`${classPrefix}-descriptions__value`}
        hoverClass={arrow ? `${classPrefix}-descriptions__value--hover` : ""}
        onClick={onClick}
      >
        <div className={`${classPrefix}-descriptions__text`}>{children}</div>
        {arrow && (
          <Icon
            className={`${classPrefix}-descriptions__arrow" name="chevronright`}
          />
        )}
      </div>
    </Level>
  );
}

Descriptions.Item = DescriptionItem;
