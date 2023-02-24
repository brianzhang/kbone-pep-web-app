import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { Icon } from "../icon";
import { ControlledProps, StyledProps } from "../_type";
import { useDefaultValue } from "../_util/use-default";
import { injectValue } from "../_util/inject-value";
import { useConfig } from "../_util/use-config";

export interface RateCharacterProps {
  /**
   * 序号
   */
  index: number;

  /**
   * 是否被全选
   */
  full: boolean;

  /**
   * 是否被半选
   */
  half: boolean;
}

export interface RateProps extends ControlledProps<number>, StyledProps {
  /**
   * 字符数
   * @default 5
   */
  count?: number;

  /**
   * 是否启用半选
   * @default false
   */
  allowHalf?: boolean;

  /**
   * 是否启用再次点击当前值后清空
   * @default true
   */
  allowClear?: boolean;

  /**
   * 是否为只读形式
   * @default false
   */
  readonly?: boolean;

  /**
   * 自定义字符
   * @default <Icon />
   */
  character?:
    | React.ReactNode
    | ((props: RateCharacterProps) => React.ReactNode);
}

export function Rate(props: RateProps) {
  const { classPrefix } = useConfig();
  const {
    value,
    onChange,
    count = 5,
    allowClear = true,
    allowHalf,
    readonly,
    character = <Icon name="star-fill" />,
    className,
    style,
  } = useDefaultValue(props, 0);

  // 内部
  const innerValue = Math.round(value * 2);

  return (
    <div 
      className={classNames(`${classPrefix}-rate`, className)}
      style={style}
    >
      <div className={`${classPrefix}-rate__items`}>
        {Array(count)
          .fill(null)
          .map((_, index) => {
            const itemValue = index * 2 + 2;
            const half = itemValue === innerValue + 1 && innerValue % 2 > 0;
            const full = itemValue <= innerValue;
            const content = injectValue(character)({ index, half, full });
            return (
              <div className={`${classPrefix}-rate__item`} key={index}>
                <div className={`${classPrefix}-rate__icon`}>{content}</div>
                {allowHalf && (
                  <div 
                    className={`${classPrefix}-rate__icon ${classPrefix}-rate__icon-active ${classPrefix}-rate__icon-half`}
                    onClick={event => {
                      if (readonly) {
                        return;
                      }
                      if (allowClear && innerValue === itemValue - 1) {
                        onChange(0, { event: event as any });
                        return;
                      }
                      onChange(Number(((itemValue - 1) / 2).toFixed(1)), {
                        event: event as any,
                      });
                    }}
                  >
                    {half && content}
                  </div>
                )}
                <div 
                  className={`${classPrefix}-rate__icon ${classPrefix}-rate__icon-active ${classPrefix}-rate__icon-full`}
                  onClick={event => {
                    if (readonly) {
                      return;
                    }
                    if (allowClear && innerValue === itemValue) {
                      onChange(0, { event: event as any });
                      return;
                    }
                    onChange(Number((itemValue / 2).toFixed(0)), {
                      event: event as any,
                    });
                  }}
                >
                  {full && content}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
