import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ITouchEvent, View } from "@tarojs/components";
import { Icon, IconProps } from "../icon";
import { StyledProps } from "../_type";
import { noop } from "../_util/noop";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

/**
 * Alert 组件支持的属性
 */
export interface AlertProps extends StyledProps {
  /**
   * 通知类型
   * @default "info"
   */
  type?: "info" | "success" | "warning" | "error";

  /**
   * 隐藏默认图标
   * @default false
   */
  hideIcon?: boolean;

  /**
   * 自定义提示图标
   */
  icon?: string | IconProps;

  /**
   * 点击回调
   *
   * *设置后将展示可跳转图标*
   */
  onClick?: (event: ITouchEvent<any>) => void;

  /**
   * 是否展示关闭图标
   * @default "false"
   */
  closeable?: boolean;

  /**
   * 自动关闭延时（单位毫秒), 0 为不自动关闭
   * @default 0
   */
  duration?: number;

  /**
   * 关闭时触发的回调函数
   */
  onClose?: () => void;

  /**
   * 提示文字内容
   */
  children: React.ReactNode;
}

const iconMap = {
  info: { name: "info-fill", color: "#006eff" },
  success: { name: "success-fill", color: "#07c160" },
  error: { name: "warning-fill", color: "#ff584c" },
  warning: { name: "warning-fill", color: "#ff9c19" },
};

export function Alert({
  type = "info",
  hideIcon,
  icon,
  children,
  onClick,
  closeable = false,
  onClose = noop,
  duration = 0,
  className,
  style,
}: AlertProps) {
  const { classPrefix } = useConfig();
  const timerRef = useRef(null);
  const [closeAlert, setCloseAlert] = useState(false);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (duration) {
      timerRef.current = setTimeout(() => {
        onClose();
        setCloseAlert(true);
      }, duration);
    }
  }, [duration, onClose]);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  let iconProps = typeof icon === "string" ? { name: icon } : icon;
  if (!iconProps && iconMap[type]) {
    iconProps = iconMap[type];
  }

  return (
    <div 
      className={classNames(
        `${classPrefix}-alert`,
        `${classPrefix}-alert--${type}`,
        className,
        {
          "is-close": closeAlert,
          "with-suffix": closeable || onClick,
        }
      )}
      style={style}
      onClick={onClick || noop}
    >
      {!hideIcon && iconProps ? (
        <Icon
          color={iconMap[type]?.color}
          size={TaroEnv ? 40 : 20}
          {...iconProps}
          className={classNames(
            `${classPrefix}-alert__icon`,
            iconProps.className
          )}
        />
      ) : null}
      <div  className={`${classPrefix}-alert__text`}>{children}</div>
      {onClick && (
        <Icon className={`${classPrefix}-alert__chevron`} name="chevronright" />
      )}
      {!onClick && closeable && (
        <div 
          onClick={() => {
            onClose();
            setCloseAlert(true);
          }}
        >
          <Icon className={`${classPrefix}-alert__close`} name="close" />
        </div>
      )}
    </div>
  );
}
