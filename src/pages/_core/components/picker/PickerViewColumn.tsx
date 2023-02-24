/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/picker-view-column/picker-view-column.tsx
 */
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";
import { PickerViewContext, PickerViewContextValue } from "./PickerView";
import { noop } from "../../../_util/noop";

export interface PickerViewColumnProps extends StandardProps {
  height?: number;
}

export const PickerViewColumn = React.forwardRef<
  HTMLDivElement,
  PickerViewColumnProps
>(function PickerViewColumn({ className, style, children }, ref) {
  const {
    value = 0,
    indicatorClass,
    indicatorStyle = {},
    onPickStart,
    onPickEnd,
    onChange,
  } = useContext<PickerViewContextValue>(PickerViewContext);

  const contentRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<number>(0);

  const timerRef = useRef(null);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorHeight, setIndicatorHeight] = useState(34);
  const indicatorTop = useMemo(() => 120 - indicatorHeight / 2, [
    indicatorHeight,
  ]);

  const insRef = useRef<{
    startY?: number;
    preY?: number;
    hadMove?: boolean;
    touchEnd?: boolean;
  }>({});

  useLayoutEffect(() => {
    const relativeHeight = indicatorTop - indicatorHeight * value;
    updateHeight(relativeHeight);
  }, [value, indicatorHeight, indicatorTop]);

  useEffect(() => {
    if (indicatorRef.current) {
      setIndicatorHeight(indicatorRef.current.clientHeight);
    }
  }, []);

  const Velocity = useMemo(() => {
    const minInterval = 30;
    const maxInterval = 100;
    let vTime = +new Date();
    let vy = 0;
    let velocity = 0;
    const recorder = {
      record: y => {
        const now = +new Date();
        velocity = -(-y + vy) / (now - vTime);
        if (now - vTime >= minInterval) {
          velocity = now - vTime <= maxInterval ? velocity : 0;
          vy = y;
          vTime = now;
        }
      },
      getVelocity: y => {
        if (y !== vy) {
          recorder.record(y);
        }
        return velocity;
      },
    };
    return recorder;
  }, []);

  function updateHeight(height: number, time = 0.3, cb = noop) {
    if (time > 1) {
      // eslint-disable-next-line no-param-reassign
      time = 1;
    }
    if (heightRef.current !== height) {
      heightRef.current = height;
      const transformValue = `translate3d(0, ${height}px, 0)`;
      const transitionValue = `cubic-bezier(0,0,0.2,1.15) ${time}s`;

      if (contentRef.current) {
        contentRef.current.style.transform = transformValue;
        contentRef.current.style.webkitTransform = transformValue;
        contentRef.current.style.transition = transitionValue;
        contentRef.current.style.webkitTransition = transitionValue;
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        cb();
        if (contentRef.current) {
          contentRef.current.style.transition = "";
          contentRef.current.style.webkitTransition = "";
        }
      }, +time * 1000);
    } else {
      cb();
    }
  }

  function handleTouchStart(event: React.TouchEvent) {
    // 记录第一次的点击位置
    insRef.current.startY = event.changedTouches[0].clientY;
    insRef.current.preY = event.changedTouches[0].clientY;
    insRef.current.hadMove = false;
    onPickStart(event);
  }

  function handleTouchMove(event: React.TouchEvent) {
    const y = event.changedTouches[0].clientY;
    const deltaY = y - insRef.current.preY;
    insRef.current.preY = y;
    insRef.current.touchEnd = false;

    if (Math.abs(y - insRef.current.startY) > 10) {
      insRef.current.hadMove = true;
    }

    heightRef.current += deltaY;

    Velocity.record(heightRef.current);
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${heightRef.current}px, 0)`;
      contentRef.current.style.webkitTransform = `translate3d(0, ${heightRef.current}px, 0)`;
    }
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const max = 0;
    const min = -indicatorHeight * (React.Children.count(children) - 1);
    const endY = event.changedTouches[0].clientY;

    insRef.current.touchEnd = true;

    let height: number;
    let time = 0.3;

    if (!insRef.current.hadMove) {
      /** 点击 */
      // 屏幕高度
      const windowHeight = window.innerHeight;
      // picker__mask 垂直方向距离屏幕顶部的高度
      const relativeY = windowHeight - (indicatorHeight * 7) / 2;
      height = heightRef.current - indicatorTop - (endY - relativeY);
    } else {
      /** 滚动 */
      height = heightRef.current;

      const velocity = Velocity.getVelocity(height) * 4;
      if (velocity) {
        height += velocity * 40;
        time = Math.abs(velocity) * 0.1;
      }
      height -= indicatorTop;
    }

    if (height > max) height = 0;
    if (height < min) height = min;

    const index = Math.abs(Math.round(height / indicatorHeight));

    const relativeHeight = indicatorTop - indicatorHeight * index;

    updateHeight(relativeHeight, time < 0.3 ? 0.3 : time, () => {
      onPickEnd(event);
      onChange(index, { event });
    });
  }

  return (
    <div
      ref={ref}
      className={classNames("tea-core-picker__column", className)}
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="tea-core-picker__mask"
        style={{ backgroundSize: `100% ${indicatorTop}px` }}
      />
      <div
        className={classNames("tea-core-picker__indicator", indicatorClass)}
        style={{
          height: indicatorHeight,
          ...indicatorStyle,
          top: indicatorTop,
        }}
        ref={indicatorRef}
      />
      <div className="tea-core-picker__content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
});
