import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ITouchEvent, Text, View } from "@tarojs/components";
import { Backdrop } from "../backdrop";
import { StyledProps } from "../_type";
import { noop } from "../_util/noop";
import { useDefault } from "../_util/use-default";
import { injectValue } from "../_util/inject-value";
import { isCallable } from "../_util/is-callable";
import { useCatchMove } from "../_util/use-catch-move";
import { useConfig } from "../_util/use-config";
import { pxTransform } from "../_util/px-transform";
import { Popper } from "../popper";

export interface PopupProps extends StyledProps {
  /**
   * 弹出位置
   * @default "bottom"
   */
  position?: "bottom" | "top" | "center" | "left" | "right";

  /**
   * 弹出层内容
   */
  overlay?: React.ReactNode | ((close: () => void) => React.ReactNode);

  /**
   * 触发元素
   */
  children?: React.ReactNode | ((open: () => void) => React.ReactNode);

  /**
   * 关闭时是否销毁
   * @default true
   */
  destroyOnClose?: boolean;

  /**
   * 是否默认显示弹出层
   * @default false
   */
  defaultVisible?: boolean;

  /**
   * 是否显示弹出层
   */
  visible?: boolean;

  /**
   * 弹出层显示变化回调
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * 是否展示遮罩
   * @default true
   */
  mask?: boolean;

  /**
   * 点击遮罩是否关闭弹出层
   * @default true
   */
  maskClosable?: boolean;

  /**
   * 关闭回调
   */
  onClose?: (context: { source: "mask" | "call"; event?: ITouchEvent }) => void;

  /**
   * 浮层 z-index
   * @default 200
   */
  zIndex?: number;

  /**
   * 偏移
   * @default 0
   */
  offset?: number | string;
}

export function Popup({
  position = "bottom",
  defaultVisible = false,
  visible,
  onVisibleChange,
  mask = true,
  maskClosable = true,
  overlay,
  children,
  onClose = noop,
  className,
  destroyOnClose = true,
  zIndex,
  offset: rawOffset,
  ...props
}: PopupProps) {
  const { classPrefix } = useConfig();
  const [opened, setOpened] = useDefault(
    visible,
    defaultVisible,
    onVisibleChange
  );

  const firstRenderedRef = useRef(opened);
  const timerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const shouldRender = opened || expanded;
  const shouldEnter = opened && expanded;

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (opened) {
      setTimeout(() => {
        setExpanded(true);
      }, 1);
    } else {
      timerRef.current = setTimeout(() => {
        setExpanded(false);
      }, 300);
    }
    return () => {
      firstRenderedRef.current = true;
    };
  }, [opened]);

  useCatchMove(opened);

  const open = () => setOpened(true);
  const close = (source: "mask" | "call", event?: ITouchEvent) => {
    onClose({ source, event });
    setOpened(false);
  };

  // 兼容老版本
  if (typeof overlay === "undefined") {
    console.warn("`Popup` API 变更，请通过 `overlay` 属性设置弹出层内容");
    return (
      <div 
        className={classNames(`${classPrefix}-popup`, className)}
        {...props}
      >
        <Backdrop
          visible={opened}
          transparent={!mask}
          onClick={event => {
            event.stopPropagation();
            if (maskClosable) {
              close("mask", event);
            }
          }}
        />
        <div 
          className={classNames(`${classPrefix}-popup__container`, position, {
            "is-shown": shouldRender,
            "is-expanded": shouldEnter,
          })}
          style={typeof zIndex === "number" ? { zIndex } : undefined}
        >
          {children}
        </div>
      </div>
    );
  }

  let trigger = injectValue(children)(open);
  if (children && !isCallable(children) && !React.isValidElement(trigger)) {
    trigger = <Text>{trigger}</label>;
  }

  const offset =
    typeof rawOffset === "number" ? pxTransform(rawOffset, 750) : rawOffset;

  return (
    <div>
      {children && !isCallable(children)
        ? React.cloneElement(trigger as React.ReactElement, { onClick: open })
        : trigger}
      <Popper>
        <div 
          className={classNames(`${classPrefix}-popup`, className)}
          {...props}
        >
          <Backdrop
            visible={opened}
            transparent={!mask}
            onClick={event => {
              event.stopPropagation();
              if (maskClosable) {
                close("mask", event);
              }
            }}
            style={{
              top: position === "top" ? offset : undefined,
              bottom: position === "bottom" ? offset : undefined,
            }}
          />
          {shouldRender || !destroyOnClose ? (
            <div 
              className={classNames(
                `${classPrefix}-popup__container`,
                position,
                {
                  "is-shown": shouldRender,
                  "is-expanded": shouldEnter,
                }
              )}
              style={{
                zIndex: typeof zIndex === "number" ? zIndex : undefined,
                top: position === "top" ? offset : undefined,
                bottom: position === "bottom" ? offset : undefined,
                marginTop: position === "center" ? offset : undefined,
              }}
            >
              {firstRenderedRef.current || shouldRender
                ? injectValue(overlay)(() => close("call"))
                : null}
            </div>
          ) : null}
        </div>
      </Popper>
    </div>
  );
}
