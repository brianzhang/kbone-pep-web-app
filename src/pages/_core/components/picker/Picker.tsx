/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/picker/picker.tsx
 */
import React from "react";
import classNames from "classnames";
import { CommonEventFunction, StandardProps } from "../types/common";

export interface PickerStandardProps extends StandardProps {
  /**
   * 选择器类型，默认是普通选择器
   * @default "selector"
   */
  mode: "selector" | "multiSelector" | "time" | "date" | "region";

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 取消选择或点遮罩层收起 picker 时触发
   */
  onCancel?: CommonEventFunction;
}

export interface PickerTimeProps extends PickerStandardProps {
  /**
   * 选择器类型
   */
  mode: "time";
  /**
   * value 的值表示选择了 range 中的第几个（下标从 0 开始）
   * @supported weapp, h5, rn
   */
  value: string;
  /**
   * 仅当 mode = time|date 时有效，表示有效时间范围的开始，字符串格式为"hh:mm"
   * @supported weapp, h5, rn
   */
  start?: string;
  /**
   * 仅当 mode = time|date 时有效，表示有效时间范围的结束，字符串格式为"hh:mm"
   * @supported weapp, h5, rn
   */
  end?: string;
  /**
   * value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange: CommonEventFunction;
}

export interface PickerDateProps extends PickerStandardProps {
  /**
   * 选择器类型
   */
  mode: "date";
  /**
   * 表示选中的日期，格式为"YYYY-MM-DD"
   * @supported weapp, h5, rn
   * @default 0
   */
  value: string;
  /**
   * 仅当 mode = time|date 时有效，表示有效时间范围的开始，字符串格式为"hh:mm"
   * @supported weapp, h5, rn
   */
  start?: string;
  /**
   * 仅当 mode = time|date 时有效，表示有效时间范围的结束，字符串格式为"hh:mm"
   * @supported weapp, h5, rn
   */
  end?: string;
  /**
   * 有效值 year, month, day，表示选择器的粒度
   * @supported weapp, h5, rn
   * @default "day"
   */
  fields?: "year" | "month" | "day";
  /**
   * value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange: CommonEventFunction;
}

export interface PickerRegionProps extends PickerStandardProps {
  /**
   * 选择器类型
   */
  mode: "region";
  /**
   * 表示选中的省市区，默认选中每一列的第一个值
   * @supported weapp, h5, rn
   * @default []
   */
  value: string[];
  /**
   * 可为每一列的顶部添加一个自定义的项
   * @supported weapp, h5, rn
   */
  customItem?: string;
  /**
   * value 改变时触发 change 事件，event.detail = {value, code, postcode}，其中字段 code 是统计用区划代码，postcode 是邮政编码
   * @supported weapp, h5, rn
   */
  onChange: CommonEventFunction;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PickerRegionProps {
  export interface onChangeEventDetail {
    /** 表示变更值的下标 */
    value: string | number;
  }
}

export const Picker = React.forwardRef<HTMLDivElement, PickerStandardProps>(
  function Picker({ className, style, children }, ref) {
    return (
      <div ref={ref} className={classNames(className)} style={style}>
        {children}
      </div>
    );
  }
);
