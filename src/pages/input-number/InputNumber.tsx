import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { BaseEventOrig, CommonEvent, Input, View } from "@tarojs/components";
import { InputProps as TaroInputProps } from "@tarojs/components/types/Input";
import { ControlledProps, StyledProps } from "../_type";
import { getPrecision } from "../_util/get-precision";
import { useDefaultValue } from "../_util/use-default";
import { noop } from "../_util/noop";
import { callBoth } from "../_util/call-both";
import { useConfig } from "../_util/use-config";

export interface InputNumberProps extends ControlledProps<number>, StyledProps {
  /**
   * 最小值
   */
  min?: number;

  /**
   * 最大值
   */
  max?: number;

  /**
   * 使用按钮增减时的步长
   * @default 1
   */
  step?: number;

  /**
   * 精度（保留小数位数）
   */
  precision?: number;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}

export function InputNumber(props: InputNumberProps) {
  const { classPrefix } = useConfig();
  const ref = useRef(null);
  const { disabled, className, style } = props;
  const { minus, input, plus } = useInputNumberHooks(props);
  const precision = props.precision ?? getPrecision(props.step);
  return (
    <div 
      className={classNames(`${classPrefix}-input-number`, className)}
      style={style}
      ref={ref}
    >
      <div 
        className={classNames(`${classPrefix}-input-number__button`, `minus`, {
          "is-disabled": disabled || minus.disabled,
        })}
        onTouchStart={disabled ? noop : minus.handleTouchStart}
        onTouchEnd={minus.handleTouchEnd}
      >
        -
      </div>
      <Input
        type="number"
        className={classNames(`${classPrefix}-input-number__input`, {
          "is-disabled": disabled,
        })}
        disabled={disabled}
        value={
          typeof input.value === "number"
            ? input.value.toFixed(precision)
            : input.value || ""
        }
        // eslint-disable-next-line dot-notation
        onInput={callBoth(props["onInput"], input.handleInput)}
        // eslint-disable-next-line dot-notation
        onBlur={callBoth(props["onBlur"], input.handleBlur)}
      />
      <div 
        className={classNames(`${classPrefix}-input-number__button`, `plus`, {
          "is-disabled": disabled || plus.disabled,
        })}
        onTouchStart={disabled ? noop : plus.handleTouchStart}
        onTouchEnd={minus.handleTouchEnd}
      >
        +
      </div>
    </div>
  );
}

function getDefaultDefaultValue(min: number, max: number) {
  if (min && min > 0) {
    return min;
  }
  if (max && max < 0) {
    return max;
  }
  return 0;
}

/**
 * InputNumber 状态管理
 */
function useInputNumberHooks(props: InputNumberProps) {
  let { step } = props;
  const { min, max, value, onChange = noop } = useDefaultValue(
    props,
    getDefaultDefaultValue(props.min, props.max)
  );

  const isValidNumber = (num: any) =>
    typeof num === "number" && !Number.isNaN(num);

  step = isValidNumber(step) ? step : 1;

  const precision = props.precision ?? getPrecision(step);

  const hasMax = isValidNumber(max);
  const hasMinus = isValidNumber(min);

  const [inputValue, setInputValue] = useState<string>(null);
  const hasInputValue = inputValue !== null;

  const parse = (newValue: string): number =>
    newValue.trim() === "" ? 0 : parseFloat(newValue);

  const getCurrentValue = () => {
    let currentValue = value;
    if (hasInputValue && /\d/.test(inputValue)) {
      currentValue = parse(inputValue);
      // 解析失败，退回当前值
      if (Number.isNaN(currentValue)) {
        currentValue = value;
      }
    }
    return currentValue;
  };

  const canMinus = (value: number) => !hasMinus || value > min;
  const canPlus = (value: number) => !hasMax || value < max;

  const commit = (_newValue: string | number, event: CommonEvent) => {
    let newValue = _newValue;
    // 从 input 回调过来的，是字符串
    if (typeof newValue === "string") {
      newValue = parse(newValue);
    }
    // 不能小于最小值
    if (hasMinus) {
      newValue = Math.max(min, newValue);
    }
    // 不能大于最大值
    if (hasMax) {
      newValue = Math.min(max, newValue);
    }
    // 解析失败，还原旧值
    if (Number.isNaN(newValue)) {
      newValue = value;
    }
    // 还原预置初始值
    if (typeof newValue !== "number" || Number.isNaN(newValue)) {
      newValue = getDefaultDefaultValue(min, max);
    }

    // 处理精度
    newValue = parse(newValue.toFixed(precision));

    onChange(newValue, { event });
  };

  // value 发生变更，清空暂存的值
  useEffect(() => setInputValue(null), [value]);

  // 长按增减按钮会持续操作
  const autoStepTimer = useRef<any>(0);
  const clear = () => clearTimeout(autoStepTimer.current);

  // 为按钮提供步长调整逻辑
  const stepper = (step: number) => {
    // 步长的符号影响是否允许进行下一步长的判断方法
    const canStep = step > 0 ? canPlus : canMinus;
    return {
      disabled: !canStep(value),

      // 点击按钮的时候，先变更一次。只要不抬起，自动连续变更
      handleTouchStart: (evt: CommonEvent) => {
        let currentValue = getCurrentValue();
        const performStep = () => {
          if (canStep(currentValue)) {
            commit((currentValue += step), evt);
          }
        };
        performStep();

        clear();
        // 1 秒后，开始自动递增
        autoStepTimer.current = setTimeout(() => {
          const autoPerform = () => {
            performStep();
            autoStepTimer.current = setTimeout(autoPerform, 50);
          };
          autoPerform();
        }, 700);

        // 阻止事件变成 blur 事件，导致二次设置
        evt.preventDefault();
      },
      handleTouchEnd: () => {
        clear();
      },
    };
  };

  return {
    minus: stepper(-step),
    plus: stepper(step),
    input: {
      value: hasInputValue ? inputValue : value,
      handleInput: (
        evt: BaseEventOrig<TaroInputProps.inputValueEventDetail>
      ) => {
        setInputValue(evt.detail.value);
      },
      handleBlur: (
        evt: BaseEventOrig<TaroInputProps.inputValueEventDetail>
      ) => {
        commit(evt.detail.value, evt);
        setInputValue(null);
      },
    },
  };
}
