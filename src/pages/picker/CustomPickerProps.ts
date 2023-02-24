import React from "react";
import {
  CommonEventFunction,
  ITouchEvent,
} from "@tarojs/components/types/common";
import { ControlledProps } from "../_type/ControlledProps";
import { StyledProps } from "../_type";

export interface SelectorProps
  extends ControlledProps<number, ITouchEvent>,
    StyledProps {
  /**
   * 选择器类型
   */
  mode?: "selector";

  /**
   * 触发元素
   */
  children: React.ReactNode;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 选项
   */
  range: React.ReactNode[] | Record<string | number, any>[];

  /**
   * 当 `range` 是一个 Object[] 时，通过 `rangeKey` 来指定对象中 key 的值作为选择器显示内容
   */
  rangeKey?: string;

  /**
   * 选择器顶部区域内容
   */
  header?: React.ReactNode;

  /**
   * 选择器底部区域内容
   */
  footer?: React.ReactNode;

  /**
   * 选择器中间选中框的类名
   */
  indicatorClassName?: string;

  /**
   * 选择器中间选中框的样式
   */
  indicatorStyle?: string;

  /**
   * 取消选择或点遮罩层收起时触发
   */
  onCancel?: CommonEventFunction;
}

export interface MultiSelectorProps
  extends Omit<
      SelectorProps,
      "defaultValue" | "value" | "onChange" | "range" | "mode"
    >,
    ControlledProps<number[], ITouchEvent> {
  /**
   * 选择器类型
   */
  mode?: "multiSelector";

  /**
   * 选项
   */
  range: React.ReactNode[][] | Record<string | number, any>[][];
}
