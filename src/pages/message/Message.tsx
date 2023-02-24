import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import EventEmitter from "eventemitter3";
import { View } from "@tarojs/components";
import { pxTransform } from "../_util/px-transform";
import { Icon, IconProps } from "../icon";
import { StyledProps } from "../_type";
import { Loading } from "../loading";
import { useConfig } from "../_util/use-config";

const globalOptions: MessageConfigOptions = {};

export interface MessageOptions extends StyledProps {
  /**
   * 提示内容
   */
  content?: React.ReactNode;

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
   * 自动关闭延时（单位毫秒）
   *
   * 设置为 0 时不自动关闭
   *
   * @default 3000
   */
  duration?: number;

  /**
   * 提示位置上下偏移
   */
  offset?: number | string;
}

export interface MessageConfigOptions extends Pick<MessageOptions, "offset"> {}

export interface MessageProps extends MessageOptions {
  /**
   * 消息类型
   * @default info
   */
  type?: "info" | "success" | "warning" | "error" | "loading";

  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
}

interface MessageEventTypes {
  show: [MessageProps];
  hide: [];
}

class MessageEmitter extends EventEmitter<MessageEventTypes> {}

const messageEmitter = new MessageEmitter();

const iconMap = {
  info: { name: "info-fill" },
  success: { name: "success-fill" },
  error: { name: "warning-fill" },
  warning: { name: "warning-fill" },
};

export function Message(_props: MessageProps) {
  const { classPrefix } = useConfig();
  const props = { ...globalOptions, ..._props };
  const [options, setOptions] = useState<MessageProps>(props);
  const timerRef = useRef(null);

  useEffect(() => {
    const onShow = ({ ...options }) => {
      clearTimeout(timerRef.current);
      setOptions({ ...globalOptions, ...options, visible: true });
      if (options.duration !== 0) {
        timerRef.current = setTimeout(
          () =>
            setOptions(options => ({
              ...globalOptions,
              ...options,
              visible: false,
            })),
          options.duration
        );
      }
    };

    const onHide = () => {
      clearTimeout(timerRef.current);
      setOptions(options => ({ ...globalOptions, ...options, visible: false }));
    };

    messageEmitter.on("show", onShow);
    messageEmitter.on("hide", onHide);
    return () => {
      clearTimeout(timerRef.current);
      messageEmitter.removeListener("show", onShow);
      messageEmitter.removeListener("hide", onHide);
    };
  }, []);

  const {
    visible,
    content,
    icon,
    type,
    className,
    style = {},
    offset,
    hideIcon,
  } = options;

  let iconProps = typeof icon === "string" ? { name: icon } : icon;
  if (!iconProps && iconMap[type]) {
    iconProps = iconMap[type];
  }

  return (
    <div 
      className={classNames(
        `${classPrefix}-message`,
        `${classPrefix}-message--${type}`,
        className,
        {
          "is-shown": visible,
        }
      )}
      style={{
        ...style,
        top: typeof offset === "number" ? pxTransform(offset, 750) : offset,
      }}
    >
      {!hideIcon && iconProps && (
        <Icon
          {...iconProps}
          className={classNames(
            `${classPrefix}-message__icon`,
            iconProps.className
          )}
        />
      )}
      {!hideIcon && type === "loading" && (
        <Loading className={`${classPrefix}-message__icon`} />
      )}
      <div className={`${classPrefix}-message__text`}>{content}</div>
    </div>
  );
}

const show = (type: MessageProps["type"]) => ({
  duration = 3000,
  ...options
}: MessageOptions) =>
  messageEmitter.emit("show", {
    type,
    duration,
    ...options,
  });

Message.info = show("info");
Message.success = show("success");
Message.warning = show("warning");
Message.error = show("error");
Message.loading = show("loading");

Message.hide = () => messageEmitter.emit("hide");
Message.config = (options: MessageConfigOptions) => {
  Object.assign(globalOptions, options);
};
