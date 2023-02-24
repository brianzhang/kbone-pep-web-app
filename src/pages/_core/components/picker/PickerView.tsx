/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/picker-view/picker-view.tsx
 */
import React, { createContext, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { CommonEventFunction, StandardProps } from "../types/common";
import { parseStyleText } from "../../../_util/parse-style-text";
import { noop } from "../../../_util/noop";
import { createEvent } from "../_util/create-event";

export interface PickerViewProps extends StandardProps {
  /**
   * 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
   */
  value?: number[];

  /**
   * 设置选择器中间选中框的样式
   */
  indicatorStyle?: string | React.CSSProperties;

  /**
   * 设置选择器中间选中框的类名
   */
  indicatorClass?: string;

  // /**
  //  * 设置蒙层的样式
  //  */
  // maskStyle?: string;

  // /**
  //  * 设置蒙层的类名
  //  */
  // maskClass?: string;

  /**
   * 当滚动选择，value 改变时触发 change 事件
   * event.detail = { value: value }
   * value 为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
   */
  onChange?: CommonEventFunction;

  /**
   * 当滚动选择开始时候触发事件
   */
  onPickStart?: CommonEventFunction;

  /**
   * 当滚动选择结束时候触发事件
   */
  onPickEnd?: CommonEventFunction;
}

export interface PickerViewContextValue
  extends Omit<PickerViewProps, "value" | "onChange" | "indicatorStyle"> {
  value?: number;
  onChange?: (value: number, { event: BaseEventOrig }) => void;
  indicatorStyle?: React.CSSProperties;
}

export const PickerViewContext = createContext<PickerViewContextValue>({});

export const PickerView = React.forwardRef<HTMLDivElement, PickerViewProps>(
  function PickerView(
    {
      value = [],
      onChange = noop,
      onPickStart,
      onPickEnd,
      className,
      style,
      children,
      indicatorClass,
      indicatorStyle: indicatorStyleText,
    },
    ref
  ) {
    const valueRef = useRef<number[]>([]);
    const pickingSetRef = useRef<Set<number>>(new Set());
    const indicatorStyle = useMemo(() => parseStyleText(indicatorStyleText), [
      indicatorStyleText,
    ]);

    useEffect(() => {
      valueRef.current = [...(value || [])];
    }, [value]);

    return (
      <div
        ref={ref}
        className={classNames("tea-core-picker__view", className)}
        style={style}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <PickerViewContext.Provider
              value={{
                value: value[index],
                onChange: (colValue, { event }) => {
                  valueRef.current[index] = colValue;
                  onChange(
                    createEvent(event, { value: [...valueRef.current] })
                  );
                },
                indicatorClass,
                indicatorStyle,
                onPickStart: event => {
                  if (pickingSetRef.current.size <= 0) {
                    onPickStart(event);
                  }
                  pickingSetRef.current.add(index);
                },
                onPickEnd: event => {
                  pickingSetRef.current.delete(index);
                  if (pickingSetRef.current.size <= 0) {
                    onPickEnd(event);
                  }
                },
              }}
            >
              {child}
            </PickerViewContext.Provider>
          );
        })}
      </div>
    );
  }
);
