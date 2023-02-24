/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/view/view.tsx
 */
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";
import { noop } from "../../../_util/noop";

export interface ViewProps extends StandardProps {
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

  /**
   * 是否以 catch 的形式绑定 touchmove 事件
   */
  catchMove?: boolean;
}

export const View = React.forwardRef<HTMLDivElement, ViewProps>(function View(
  {
    hoverStartTime = 50,
    hoverStayTime = 400,
    hoverClass,
    className,
    onTouchStart = noop,
    onTouchEnd = noop,
    onTouchMove = noop,
    onLongPress = noop,
    catchMove, // TODO
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
    <div
      ref={ref}
      className={classNames(className, { [hoverClass]: hover })}
      onTouchStart={event => {
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
      onTouchMove={event => {
        onTouchMove(event);
        clearTimeout(pressTimerRef.current);
      }}
      onTouchEnd={event => {
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
});

View.displayName = "View";
