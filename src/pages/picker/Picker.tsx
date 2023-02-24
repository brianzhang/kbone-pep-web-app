import React from "react";
import classNames from "classnames";
import {
  Picker as TaroPicker,
  View,
  Text,
  ITouchEvent,
} from "@tarojs/components";
import { BaseEventOrig, StandardProps } from "@tarojs/components/types/common";
import {
  PickerTimeProps as TaroPickerTimeProps,
  PickerDateProps as TaroPickerDateProps,
  PickerRegionProps as TaroPickerRegionProps,
} from "@tarojs/components/types/Picker";
import { useDefaultValue } from "../_util/use-default";
import { CommonProps, ControlledProps, StyledProps } from "../_type";
import { Selector } from "./custom/selector";
import { MultiSelector } from "./custom/multi-selector";
import { MultiSelectorProps, SelectorProps } from "./CustomPickerProps";
import { Icon } from "../icon";
import { DatePicker } from "../date-picker/DatePicker";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";

type OmitType = keyof StandardProps | "value" | "onChange";

interface commonProps<V, E = any>
  extends ControlledProps<V, BaseEventOrig<E>>,
    StyledProps {
  /**
   * 点击唤起选择器的 `node` 节点
   */
  children?: React.ReactNode;
}

/** 时间选择器：mode="time" */
export interface PickerTimeProps
  extends commonProps<TaroPickerTimeProps["value"]>,
    Omit<TaroPickerTimeProps, OmitType> {
  /**
   * 表示选中的时间，格式为 "hh:mm"

   */
  value?: TaroPickerTimeProps["value"];
}

/** 日期选择器：mode="date" */
export interface PickerDateProps
  extends commonProps<TaroPickerDateProps["value"]>,
    Omit<TaroPickerDateProps, OmitType> {
  /**
   * 表示选中的日期，格式为 "YYYY-MM-DD"
   * @default 当天
   */
  value?: TaroPickerDateProps["value"];
}

/** 省市区选择器：mode="region" */
export interface PickerRegionProps
  extends commonProps<
      TaroPickerRegionProps["value"],
      TaroPickerRegionProps.onChangeEventDetail
    >,
    Omit<TaroPickerRegionProps, OmitType> {}

export function Picker(
  props:
    | SelectorProps
    | MultiSelectorProps
    | PickerTimeProps
    | PickerDateProps
    | PickerRegionProps
) {
  const { classPrefix } = useConfig();
  const { onChange, ...restProps } = useDefaultValue(props);

  // 当前只有小程序支持 PickerView 自定义

  if (props.mode === "selector") {
    return <Selector {...props} />;
  }
  if (props.mode === "multiSelector") {
    return <MultiSelector {...props} />;
  }
  if (props.mode === "date") {
    return <DatePicker {...props} format="YYYY-MM-DD" />;
  }
  if (props.mode === "time") {
    return <DatePicker {...props} format="HH:mm" />;
  }

  return (
    <TaroPicker
      className={classNames(`${classPrefix}-picker`)}
      {...(restProps as any)}
      onChange={event =>
        (onChange as any)((event as BaseEventOrig<any>).detail.value, { event })
      }
    />
  );
}

export interface PickerButtonProps extends CommonProps {
  /**
   * 为空时展示内容
   */
  placeholder?: React.ReactNode;

  /**
   * 是否在加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 是否为激活状态样式
   * @default false
   */
  active?: boolean;

  /**
   * 点击回调
   */
  onClick?: (e?: ITouchEvent) => void;
}

Picker.Button = function PickerButton({
  placeholder,
  loading,
  children,
  active,
  ...props
}: PickerButtonProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  return (
    <div className={classNames(`${classPrefix}-picker-button`)} {...props}>
      <div className={`${classPrefix}-picker-button__inner`}>
        {loading ? (
          <label className={`${classPrefix}-picker-button__loading`}>
            {t.loading}
          </label>
        ) : (
          <div className={`${classPrefix}-picker-button__cell`}>
            <div className={`${classPrefix}-picker-button__value`}>
              {children || placeholder}
            </div>
            <Icon
              name="arrowdown"
              className={classNames(`${classPrefix}-picker-button__arrowdown`, {
                "is-active": active,
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
