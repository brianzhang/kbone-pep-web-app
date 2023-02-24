import React, { useState, useRef } from "react";
import classNames from "classnames";
import { View, ITouchEvent, BaseEventOrig } from "@tarojs/components";
import { ControlledProps, StyledProps } from "../_type";
import { noop } from "../_util/noop";
import { useDefaultValue } from "../_util/use-default";
import { getRect } from "../_util/get-rect";
import { useReady } from "../_util/use-is-ready";
import { useConfig } from "../_util/use-config";

export interface SliderProps
  extends ControlledProps<number, BaseEventOrig<ITouchEvent>>,
    StyledProps {
  /**
   * 取值的最小值
   * @default 0
   */
  min?: number;

  /**
   * 取值的最大值
   * @default 100
   */
  max?: number;

  /**
   * 取值步长
   * @default 1
   */
  step?: number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 自定义描述内容
   * @default value => value
   */
  formatter?: (value: number) => React.ReactNode;
}

const defaultFormatter = v => v;

export function Slider(props: SliderProps) {
  const { classPrefix } = useConfig();
  const {
    className,
    value,
    onChange = noop,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    formatter = defaultFormatter,
    ...restProps
  } = useDefaultValue<number, SliderProps>(props, 0);
  const range = Math.max(100, max);

  const [startX, setStartX] = useState(null);
  const [startValue, setStartValue] = useState(null);
  const [rect, setRect] = useState(null);

  const sliderRef = useRef(null);

  const formatNumber = value => {
    return Math.round(Math.max(min, Math.min(max, value)) / step) * step;
  };

  const start = (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    setStartX(e.touches[0].clientX);
    setStartValue(formatNumber(value));
  };

  const move = (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    const current = e.touches[0].clientX;
    const diff = current - startX;
    const newValue = formatNumber(startValue + (diff / rect.width) * range);
    onChange(newValue, { event: e });
  };

  const click = (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    const x =
      typeof (e.changedTouches[0] as any)?.x !== "undefined"
        ? (e.changedTouches[0] as any).x
        : (e.changedTouches[0] as any).clientX;

    const newValue = formatNumber(((x - rect.left) / rect.width) * range);
    onChange(newValue, { event: e });
  };

  useReady(async () => {
    const [rectInfo] = await getRect(sliderRef);
    setRect(rectInfo);
  });

  const text = formatter(value);

  return (
    <div 
      className={classNames(`${classPrefix}-slider`, className)}
      {...restProps}
    >
      <div 
        className={`${classPrefix}-slider__progress`}
        onTouchEnd={click}
        ref={sliderRef}
      >
        <div 
          className={`${classPrefix}-slider__progress--stick ${classPrefix}-slider__feature`}
        />
        <div 
          className={`${classPrefix}-slider__progress__button`}
          style={{
            left: `${(value / range) * 100}%`,
          }}
          onTouchStart={start}
          onTouchMove={move}
        />
        <div 
          className={classNames(`${classPrefix}-slider__progress--active`, {
            [`${classPrefix}-slider__progress--disabled`]: disabled,
          })}
          style={{
            width: `${(value / range) * 100}%`,
          }}
        />
      </div>
      <div 
        className={`${classPrefix}-slider__feature`}
        onClick={e => {
          onChange(100, { event: e });
        }}
      />
      {text && <div className={`${classPrefix}-slider__value`}>{text}</div>}
    </div>
  );
}
