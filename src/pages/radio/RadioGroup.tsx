import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { noop } from "../_util/noop";
import { useDefault } from "../_util/use-default";
import { StyledProps, ControlledProps } from "../_type";
import { CheckContext, CheckContextValue, CheckProps } from "../check";
import { useConfig } from "../_util/use-config";

export interface RadioGroupProps
  extends ControlledProps<string>,
    Pick<CheckProps, "block">,
    StyledProps {
  /**
   * 禁用组件
   * @default false
   * */
  disabled?: boolean;

  /**
   * 单选框类型
   *
   * - `"default"` 默认样式
   * - `"button"` 按钮样式
   * @default "default"
   */
  type?: "default" | "button";

  /**
   * 单选框内容
   */
  children?: React.ReactNode;
}

export function RadioGroup({
  value: checkValue,
  defaultValue: defaultCheckValue,
  onChange: onCheckValueChange = noop,
  disabled = false,
  type,
  block,
  className,
  style,
  children,
}: RadioGroupProps) {
  const { classPrefix } = useConfig();
  const [value, onChange] = useDefault(
    checkValue,
    defaultCheckValue,
    onCheckValueChange
  );

  const context: CheckContextValue = {
    inject: checkProps => {
      // 只为 radio 提供
      if (!checkProps.radio) {
        return checkProps;
      }

      // 如果已经受控，则不注入
      if (typeof checkProps.checked === "boolean") {
        return checkProps;
      }

      const checkName = checkProps.name;
      if (typeof checkName === "undefined") {
        console.warn(
          '<Radio> managed by <RadioGroup> must include the "name" prop'
        );
        return checkProps;
      }

      return {
        ...checkProps,
        type,
        block,
        checked: value === checkProps.name,
        disabled: checkProps.disabled || disabled,
        onChange(checked, context) {
          if (typeof checkProps.onChange === "function") {
            checkProps.onChange(checked, context);
            return;
          }
          if (typeof onChange === "function") {
            onChange(checkName, context);
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
