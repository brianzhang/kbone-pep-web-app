/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/scroll-view/scroll-view.tsx
 */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import {
  BaseEventOrigFunction,
  CommonEventFunction,
  StandardProps,
} from "../types/common";
import { noop } from "../../../_util/noop";
import { mergeRefs } from "../../../_util/merge-refs";
import { createEvent } from "../_util/create-event";

export interface ScrollViewProps extends StandardProps {
  /**
   * 允许横向滚动
   * @default false
   */
  scrollX?: boolean;

  /**
   * 允许纵向滚动
   * @default false
   */
  scrollY?: boolean;

  /**
   * 距顶部/左边多远时（单位px）触发事件
   * @default 50
   */
  upperThreshold?: number;

  /**
   * 距底部/右边多远时（单位px）触发事件
   * @default 50
   */
  lowerThreshold?: number;

  /**
   * 设置竖向滚动条位置
   */
  scrollTop?: number;

  /**
   * 设置横向滚动条位置
   */
  scrollLeft?: number;

  /**
   * 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
   */
  scrollIntoView?: string;

  /**
   * 在设置滚动条位置时使用动画过渡
   * @default false
   */
  scrollWithAnimation?: boolean;

  /**
   * 滚动到顶部/左边触发事件
   */
  onScrollToUpper?: CommonEventFunction;

  /**
   * 滚动到底部/右边触发事件
   */
  onScrollToLower?: CommonEventFunction;

  /**
   * 滚动时触发
   *
   * `event.detail = { scrollLeft, scrollTop, scrollHeight, scrollWidth }`
   */
  onScroll?: BaseEventOrigFunction;

  enhanced?: boolean;
  showScrollbar?: boolean;
}

function debounce(fn: (...arg: any) => any, delay: number) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function easeOutScroll(
  from: number,
  to: number,
  callback: (pos: number) => any
) {
  if (from === to || typeof from !== "number") {
    return;
  }

  const change = to - from;
  const dur = 500;
  const sTime = Date.now();
  const isLarger = to >= from;

  function linear(t: number, b: number, c: number, d: number): number {
    return (c * t) / d + b;
  }

  function step() {
    // eslint-disable-next-line no-param-reassign
    from = linear(Date.now() - sTime, from, change, dur);
    if ((isLarger && from >= to) || (!isLarger && to >= from)) {
      callback(to);
      return;
    }
    callback(from);
    requestAnimationFrame(step);
  }

  step();
}

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>(
  function ScrollView(
    {
      scrollX,
      scrollY,
      upperThreshold = 50,
      lowerThreshold = 50,
      scrollTop,
      scrollLeft,
      scrollIntoView,
      scrollWithAnimation,
      onScrollToUpper = noop,
      onScrollToLower = noop,
      onScroll = noop,
      className,
      children,
      style,
    },
    ref
  ) {
    const viewRef = useRef<HTMLDivElement>(null);
    const scrollTopRef = useRef<number>(0);
    const scrollLeftRef = useRef<number>(0);

    useEffect(() => {
      const top = Number(scrollTop);
      const left = Number(scrollLeft);

      if (scrollY && !Number.isNaN(scrollTop)) {
        if (scrollWithAnimation) {
          easeOutScroll(0, top, pos => {
            viewRef.current.scrollTop = pos;
          });
        } else {
          viewRef.current.scrollTop = top;
        }
        scrollTopRef.current = top;
      }

      if (scrollX && !Number.isNaN(left)) {
        if (scrollWithAnimation) {
          easeOutScroll(0, left, pos => {
            viewRef.current.scrollLeft = pos;
          });
        } else {
          viewRef.current.scrollLeft = left;
        }
        scrollLeftRef.current = left;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      const top = Number(scrollTop);
      if (scrollY && !Number.isNaN(top) && top !== scrollTopRef.current) {
        if (scrollWithAnimation) {
          easeOutScroll(scrollTopRef.current, top, pos => {
            viewRef.current.scrollTop = pos;
          });
        } else {
          viewRef.current.scrollTop = top;
        }
        scrollTopRef.current = top;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollTop]);

    useLayoutEffect(() => {
      const left = Number(scrollLeft);
      if (scrollX && !Number.isNaN(left) && left !== scrollLeftRef.current) {
        if (scrollWithAnimation) {
          easeOutScroll(scrollLeftRef.current, left, pos => {
            viewRef.current.scrollLeft = pos;
          });
        } else {
          viewRef.current.scrollLeft = left;
        }
        scrollLeftRef.current = left;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollLeft]);

    useLayoutEffect(() => {
      if (typeof scrollIntoView === "string" && scrollIntoView) {
        document.querySelector(`#${scrollIntoView}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }
    }, [scrollIntoView]);

    const upperAndLower = debounce(event => {
      const {
        offsetWidth,
        offsetHeight,
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
      } = viewRef.current;

      const lThreshold = Number(lowerThreshold);
      const uThreshold = Number(upperThreshold);

      if (
        !Number.isNaN(lThreshold) &&
        ((scrollY && offsetHeight + scrollTop + lThreshold >= scrollHeight) ||
          (scrollX && offsetWidth + scrollLeft + lThreshold >= scrollWidth))
      ) {
        onScrollToLower(
          createEvent(event, {
            // eslint-disable-next-line no-nested-ternary
            direction: scrollX ? "right" : scrollY ? "bottom" : "",
          })
        );
      }

      if (
        !Number.isNaN(uThreshold) &&
        ((scrollY && scrollTop <= uThreshold) ||
          (scrollX && scrollLeft <= uThreshold))
      ) {
        onScrollToUpper(
          createEvent(event, {
            // eslint-disable-next-line no-nested-ternary
            direction: scrollX ? "left" : scrollY ? "top" : "",
          })
        );
      }
    }, 200);

    function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
      if (!viewRef.current || event instanceof CustomEvent) {
        return;
      }
      const {
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
      } = viewRef.current;

      scrollLeftRef.current = scrollLeft;
      scrollTopRef.current = scrollTop;

      upperAndLower(event);
      onScroll(
        createEvent(event, {
          scrollLeft,
          scrollTop,
          scrollHeight,
          scrollWidth,
        })
      );
    }

    return (
      <div
        ref={mergeRefs(ref, viewRef)}
        className={classNames("tea-core-scroll-view", className, {
          "tea-core-scroll-view__scroll-x": scrollX,
          "tea-core-scroll-view__scroll-y": scrollY,
        })}
        style={style}
        onScroll={handleScroll}
      >
        {children}
      </div>
    );
  }
);
