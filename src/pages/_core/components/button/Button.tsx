/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/button/button.tsx
 */
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";
import { noop } from "../../../_util/noop";

export interface ButtonProps extends StandardProps {
  /**
   * 按钮类型
   */
  formType?: "submit" | "reset";

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 指定按下去的样式类
   */
  hoverClass?: string;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @default 50
   */
  hoverStartTime?: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @default 400
   */
  hoverStayTime?: number;

  openType?: never;
  lang?: never;
  sessionFrom?: never;
  sendMessageTitle?: never;
  sendMessagePath?: never;
  sendMessageImg?: never;
  appParameter?: never;
  onContact?: never;
  onGetUserInfo?: never;
  onGetPhoneNumber?: never;
  onOpenSetting?: never;
  onError?: never;
  onLaunchapp?: never;
  onGetRealnameAuthInfo?: never;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      formType,
      disabled,
      hoverStartTime = 20,
      hoverStayTime = 70,
      hoverClass = "button-hover",
      className,
      onTouchStart = noop,
      onTouchEnd = noop,
      onLongPress = noop,
      ...props
    },
    ref
  ) {
    const [hover, setHover] = useState(false);

    const touchRef = useRef(false);

    const startTimerRef = useRef(null);
    const endTimerRef = useRef(null);
    const pressTimerRef = useRef(null);

    const startTimeRef = useRef(0);

    useEffect(() => {
      return () => {
        clearTimeout(startTimerRef.current);
        clearTimeout(endTimerRef.current);
        clearTimeout(pressTimerRef.current);
      };
    }, []);

    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={formType || "button"}
        className={classNames("tea-core-button", className, {
          [hoverClass]: hover && !disabled,
        })}
        onTouchStart={event => {
          if (disabled) {
            return;
          }
          onTouchStart(event);
          if (hoverClass) {
            touchRef.current = true;
            startTimerRef.current = setTimeout(() => {
              if (touchRef.current) {
                setHover(true);
              }
            }, hoverStartTime);
          }
          pressTimerRef.current = setTimeout(() => {
            onLongPress(event);
          }, 350);
          startTimeRef.current = Date.now();
        }}
        onTouchEnd={event => {
          if (disabled) {
            return;
          }
          onTouchEnd(event);
          const spanTime = Date.now() - startTimeRef.current;
          if (spanTime < 350) {
            clearTimeout(pressTimerRef.current);
          }
          if (hoverClass) {
            touchRef.current = false;
            endTimerRef.current = setTimeout(() => {
              if (!touchRef.current) {
                setHover(false);
              }
            }, hoverStayTime);
          }
        }}
        {...props}
      />
    );
  }
);
