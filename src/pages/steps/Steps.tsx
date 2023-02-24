import React, { Fragment } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { StyledProps } from "../_type";
import { Icon } from "../icon";
import { noop } from "../_util/noop";
import { useConfig } from "../_util/use-config";

export interface StepsProps extends StyledProps {
  /**
   * 当前步骤
   * @default 0
   */
  current?: number;

  /**
   * 步骤
   */
  steps?: StepProps[];

  /**
   * 是否为垂直方向
   * @default false
   */
  vertical?: boolean;

  /**
   * 仅用做展示的步骤条，没有进度状态区分
   * @default false
   */
  readonly?: boolean;

  /**
   * 点击步骤回调
   */
  onChange?: (current?: number) => void;
}

export interface StepProps extends StyledProps {
  /**
   * 步骤说明文本
   */
  title?: React.ReactNode;

  /**
   * 步骤详情
   *
   * *仅在垂直模式下展示*
   */
  description?: React.ReactNode;
}

export function Steps({
  current = 0,
  onChange = noop,
  steps,
  vertical,
  readonly,
  className,
  style,
}: StepsProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-steps`, className, {
        "is-vertical": vertical,
      })}
      style={style}
    >
      {steps.map(({ title, description, className, style }, index) => {
        return (
          <Fragment key={index}>
            {!vertical && index > 0 && (
              <div className={`${classPrefix}-steps__arrow`}>
                <Icon name="chevronright" />
              </div>
            )}
            <div 
              className={classNames(`${classPrefix}-steps__item`, className, {
                "is-current": !readonly && index === current,
                "is-readonly": readonly,
              })}
              style={style}
              onClick={event => {
                onChange(index);
              }}
            >
              {index < current ? (
                <Icon
                  className={`${classPrefix}-steps__icon`}
                  name="success-fill"
                />
              ) : (
                <label className={`${classPrefix}-steps__icon`}>
                  {index + 1}
                </label>
              )}

              <label className={`${classPrefix}-steps__title`}>{title}</label>
            </div>
            {vertical && (
              <div className={`${classPrefix}-steps__content`}>
                <div className={`${classPrefix}-steps__content-desc`}>
                  {description}
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
