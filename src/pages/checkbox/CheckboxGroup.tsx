import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { noop } from "../_util/noop";
import { useDefault } from "../_util/use-default";
import { StyledProps, ControlledProps } from "../_type";
import { CheckContext, CheckContextValue, CheckProps } from "../check";
import { useConfig } from "../_util/use-config";

export interface CheckboxGroupProps
  extends ControlledProps<string[]>,
    Pick<CheckProps, "block">,
    StyledProps {
  /**
   * 禁用组件
   * @default false
   * */
  disabled?: boolean;

  /**
   * 复选框类型
   *
   * - `"default"` 默认样式
   * - `"square"` 方形样式
   * - `"button"` 按钮样式
   * @default "default"
   */
  type?: "default" | "square" | "button";

  /**
   * 复选框内容
   */
  children?: React.ReactNode;
}

export function CheckboxGroup({
  value: checkValue,
  defaultValue: defaultCheckValue = [],
  onChange: onCheckValueChange = noop,
  disabled = false,
  type,
  block,
  className,
  style,
  children,
}: CheckboxGroupProps) {
  const { classPrefix } = useConfig();
  const [value, onChange] = useDefault(
    checkValue,
    defaultCheckValue,
    onCheckValueChange
  );

  const checkedSet = new Set(value || []);

  const context: CheckContextValue = {
    inject: checkProps => {
      // 只为 checkbox 提供
      if (checkProps.radio) {
        return checkProps;
      }

      // 如果已经受控，则不注入
      if (typeof checkProps.checked === "boolean") {
        return checkProps;
      }

      const checkName = checkProps.name;
      if (typeof checkName === "undefined") {
        console.warn(
          '<Checkbox> managed by <CheckboxGroup> must include the "name" prop'
        );
        return checkProps;
      }

      return {
        ...checkProps,
        type,
        block,
        checked: checkedSet.has(checkName),
        disabled: checkProps.disabled || disabled,
        onChange(checked, context) {
          // 支持 checkbox 上的 onChange 处理时阻止默认的处理行为
          if (typeof checkProps.onChange === "function") {
            checkProps.onChange(checked, context);
            return;
          }
          if (typeof onChange === "function") {
            const newValue = checked
              ? [...value, checkName]
              : (checkedSet.delete(checkName), Array.from(checkedSet));
            onChange(newValue, context);
          }
        },
      };
    },
  };

  return (
    <div 
      className={classNames(`${classPrefix}-checkbox-group`, className, {
        [`${classPrefix}-checkbox-group--outline`]: type === "button",
      })}
      style={style}
    >
      <CheckContext.Provider value={context}>{children}</CheckContext.Provider>
    </div>
  );
}
