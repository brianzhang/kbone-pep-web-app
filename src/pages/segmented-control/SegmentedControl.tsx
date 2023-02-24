import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { ControlledProps, StyledProps } from "../_type";
import { useDefaultValue } from "../_util/use-default";
import { useConfig } from "../_util/use-config";

export interface SegmentedControlProps
  extends ControlledProps<number>,
    StyledProps {
  /**
   * 选项数组
   */
  values: React.ReactNode[];

  /**
   * 默认选中项索引
   * @default 0
   */
  defaultValue?: number;
}

export function SegmentedControl(props: SegmentedControlProps) {
  const { classPrefix } = useConfig();
  const { values, value, onChange, className, ...restProps } = useDefaultValue(
    props,
    0
  );
  return (
    <div 
      className={classNames(
        `${classPrefix}-segmented-control`,
        className,
        `count-${values.length}`
      )}
      {...restProps}
    >
      {values.map((name, index) => (
        <div 
          key={index}
          className={classNames(`${classPrefix}-segmented-control__option`, {
            "is-active": value === index,
          })}
          onClick={event => {
            onChange(index, { event });
          }}
        >
          <div className={`${classPrefix}-segmented-control__option-inner`}>
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}
