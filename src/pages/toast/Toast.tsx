import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import EventEmitter from "eventemitter3";
import { Text, View } from "@tarojs/components";
import { Icon, IconProps } from "../icon";
import { StyledProps } from "../_type";
import { Loading } from "../loading";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface ToastOptions extends StyledProps {
  /**
   * 提示内容
   */
  content?: React.ReactNode;

  /**
   * 提示图标
   */
  icon?: string | IconProps;

  /**
   * 自动关闭延时（单位毫秒）
   * @default 3000
   */
  duration?: number;
}

export interface ToastProps extends ToastOptions {
  /**
   * 消息类型
   * @default default
   */
  type?: "default" | "loading";

  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
}

interface ToastEventTypes {
  show: [ToastProps];
  hide: [];
}

class ToastEmitter extends EventEmitter<ToastEventTypes> {}

const toastEmitter = new ToastEmitter();

export function Toast(props: ToastProps) {
  const { classPrefix } = useConfig();
  const [options, setOptions] = useState<ToastProps>(props);
  const timerRef = useRef(null);

  useEffect(() => {
    const onShow = ({ duration = 3000, ...options }) => {
      clearTimeout(timerRef.current);
      setOptions({ ...options, visible: true });
      timerRef.current = setTimeout(
        () => setOptions(options => ({ ...options, visible: false })),
        duration
      );
    };

    const onHide = () => {
      clearTimeout(timerRef.current);
      setOptions(options => ({ ...options, visible: false }));
    };

    toastEmitter.on("show", onShow);
    toastEmitter.on("hide", onHide);
    return () => {
      clearTimeout(timerRef.current);
      toastEmitter.removeListener("show", onShow);
      toastEmitter.removeListener("hide", onHide);
    };
  }, []);

  const {
    type = "default",
    visible,
    content,
    icon,
    className,
    style,
  } = options;
  const iconProps = typeof icon === "string" ? { name: icon } : icon;
  return (
    <div 
      className={classNames(`${classPrefix}-toast`, className, {
        "is-shown": visible,
        [`${classPrefix}-toast--pure-text`]: type === "default" && !iconProps,
      })}
      style={style}
    >
      <div className={`${classPrefix}-toast__container`}>
        {iconProps && <Icon size={TaroEnv ? 96 : 48} {...iconProps} />}
        {type === "loading" && (
          <Loading color="#ffffff" size={TaroEnv ? 64 : 32} />
        )}
        {content && (
          <label className={`${classPrefix}-toast__text`}>{content}</label>
        )}
      </div>
    </div>
  );
}

Toast.show = (options: ToastOptions) => toastEmitter.emit("show", options);
Toast.loading = (options: Omit<ToastOptions, "icon">) =>
  toastEmitter.emit("show", { ...options, type: "loading" });
Toast.hide = () => toastEmitter.emit("hide");
