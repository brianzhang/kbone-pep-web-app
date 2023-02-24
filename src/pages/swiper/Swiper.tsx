import React, { useContext, useRef } from "react";
import classNames from "classnames";
import {
  View,
  Swiper as TaroSwiper,
  SwiperItem as TaroSwiperItem,
  BaseEventOrig,
  CommonEventFunction,
} from "@tarojs/components";
import {
  Swiper as CoreSwiper,
  SwiperItem as CoreSwiperItem,
  SwiperProps as CoreSwiperSwiper,
} from "../_core/components/swiper";
import { CommonProps } from "../_type";
import { noop } from "../_util/noop";
import { isChildOfType } from "../_util/is-child-of-type";
import { TaroEnv } from "../_util/env";
import { useDefault } from "../_util/use-default";
import { injectValue } from "../_util/inject-value";
import { SwiperContext } from "./SwiperContext";
import { useConfig } from "../_util/use-config";

const TSwiper = TaroEnv === "weapp" ? TaroSwiper : CoreSwiper;
const TSwiperItem = TaroEnv === "weapp" ? TaroSwiperItem : CoreSwiperItem;

export interface SwiperProps extends CommonProps {
  /**
   * 是否显示面板指示点
   * @default false
   */
  indicatorDots?: boolean;

  /**
   * 指示点颜色
   * @default "rgba(0, 0, 0, .4)"
   */
  indicatorColor?: string;

  /**
   * 当前选中的指示点颜色
   * @default "#ffffff"
   */
  indicatorActiveColor?: string;

  /**
   * 自定义渲染指示区域
   * @docType React.ReactNode | (current: number, total: number) => React.ReactNode
   */
  indicator?:
    | React.ReactNode
    | ((current: number, total: number) => React.ReactNode);

  /**
   * 是否自动切换
   * @default false
   */
  autoplay?: boolean;

  /**
   * 当前所在滑块的 index
   * @default 0
   */
  current?: number;

  /**
   * 自动切换时间间隔
   * @default 5000
   */
  interval?: number;

  /**
   * 滑动动画时长
   * @default 500
   */
  duration?: number;

  /**
   * 是否采用衔接滑动
   * @default false
   */
  circular?: boolean;

  /**
   * 滑动方向是否为纵向
   * @default false
   */
  vertical?: boolean;

  /**
   * 相邻 SwiperItem 间距
   * @default 0
   * @supported h5
   */
  spaceBetween?: number;

  /**
   * 前边距，可用于露出后一项的一小部分
   *
   * *接受 px 和 rpx 值*
   *
   * @default 0
   */
  previousMargin?: number | string;

  /**
   * 后边距，可用于露出后一项的一小部分
   *
   * *接受 px 和 rpx 值*
   *
   * @default 0
   */
  nextMargin?: number | string;

  /**
   * 同时显示的滑块数量
   * @default 1
   */
  displayMultipleItems?: number;

  /**
   * 是否启用双击/触摸缩放功能
   *
   * **可缩放 Swiper.Item 内的 img/picture/canvas 元素**
   *
   * @default false
   * @supported h5
   */
  zoom?: CoreSwiperSwiper["zoom"];

  /**
   * current 改变时触发事件
   */
  onChange?: (current: number, context: { event: BaseEventOrig<any> }) => void;

  /**
   * 动画结束时触发事件
   */
  onAnimationFinish?: SwiperProps["onChange"];

  /**
   * 点击项触发事件
   * @supported h5
   */
  onClick?: (index: number, context: { event: BaseEventOrig<any> }) => void;

  /**
   * 设置 current 时是否启用动画
   * @default false
   * @supported h5
   */
  animationOnSetCurrent?: boolean;

  /**
   * SwiperItem 的位置发生改变时触发事件
   * @supported weapp
   */
  onTransition?: CommonEventFunction;

  /**
   * 当 SwiperItem 的个数大于等于 2，关闭 `circular` 并且开启 `previousMargin` 或 `nextMargin` 的时候，可以指定这个边距是否应用到第一个、最后一个元素
   * @default false
   * @supported weapp
   */
  snapToEdge?: boolean;

  /**
   * 是否跳过未显示的滑块布局
   *
   * *设为 `true` 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息*
   *
   * @default false
   * @supported weapp
   */
  skipHiddenItemLayout?: boolean;

  /**
   * 指定切换缓动动画类型
   * @default "default"
   * @supported weapp
   */
  easingFunction?:
    | "default"
    | "linear"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic";

  /**
   * Swiper 实例
   * @supported h5
   */
  swiperRef?: CoreSwiperSwiper["swiperRef"];
}

export function Swiper({
  indicatorDots,
  indicatorActiveColor = "#ffffff",
  indicatorColor = "rgba(0, 0, 0, .4)",
  indicator,
  previousMargin = 0,
  nextMargin = 0,
  displayMultipleItems = 1,
  circular,
  className,
  style,
  current: _current,
  onChange: _onChange = noop,
  onAnimationFinish = noop,
  onClick = noop,
  spaceBetween = 0,
  zoom,
  animationOnSetCurrent,
  children,
  swiperRef,
  ...props
}: SwiperProps) {
  const { classPrefix } = useConfig();
  const [current, onChange] = useDefault(_current, 0, _onChange);
  const count = React.Children.count(children);
  if (count < 2) {
    // eslint-disable-next-line no-param-reassign
    circular = false;
  }

  const clickHandlersRef = useRef<any[]>([]);
  const h5Props = {
    zoom,
    spaceBetween,
    animationOnSetCurrent,
    swiperRef,
    // H5 环境触发
    onSwiperClick: (index, { event }) => {
      const length = count;
      const extra = circular ? displayMultipleItems : 0;
      const current = (index - extra) % length;
      onClick(current, { event });
      if (typeof clickHandlersRef.current[current] === "function") {
        clickHandlersRef.current[current](event);
      }
    },
  };

  return (
    <div 
      className={classNames(`${classPrefix}-swiper`, className, {
        "swiper-zoom": zoom,
      })}
      style={style}
    >
      <SwiperContext.Provider value={{ zoom }}>
        <TSwiper
          {...(h5Props as any)}
          // Taro 环境触发（H5 内部组件已忽略 onClick）
          onClick={event => {
            onClick(current, { event });
            // Taro h5 下 SwiperItem 直接绑定 onClick 会导致 circular 下相邻页点击无效
            if (
              TaroEnv !== "weapp" &&
              typeof clickHandlersRef.current[current] === "function"
            ) {
              clickHandlersRef.current[current](event);
            }
          }}
          current={current}
          circular={circular}
          indicatorDots={!indicator && indicatorDots}
          indicatorActiveColor={indicatorActiveColor}
          indicatorColor={indicatorColor}
          displayMultipleItems={displayMultipleItems}
          onChange={event => onChange(event.detail.current, { event })}
          onAnimationFinish={event =>
            onAnimationFinish(event.detail.current, { event })
          }
          previousMargin={
            typeof previousMargin === "number"
              ? `${previousMargin}px`
              : previousMargin
          }
          nextMargin={
            typeof nextMargin === "number" ? `${nextMargin}px` : nextMargin
          }
          {...props}
        >
          {React.Children.map(children, (child, index) => {
            if (isChildOfType(child, SwiperItem)) {
              if (child.props.onClick) {
                clickHandlersRef.current[index] = child.props.onClick;
              }
            }
            return child;
          })}
        </TSwiper>
        {!!indicator && injectValue(indicator)(current, count)}
      </SwiperContext.Provider>
    </div>
  );
}

Swiper.displayName = "Swiper";
Swiper.Item = SwiperItem;

export interface SwiperItemProps extends CommonProps {
  /**
   * 点击触发事件
   */
  onClick?: (event: BaseEventOrig<any>) => void;
}

export function SwiperItem({
  onClick = noop,
  children,
  ...props
}: SwiperItemProps) {
  const { zoom } = useContext(SwiperContext);
  if (TaroEnv === "weapp") {
    return (
      <TaroSwiperItem onClick={onClick} {...props}>
        {children}
      </TaroSwiperItem>
    );
  }
  if (zoom) {
    return (
      <TSwiperItem {...props}>
        <div className="swiper-zoom-container">{children}</div>
      </TSwiperItem>
    );
  }
  return <TSwiperItem {...props}>{children}</TSwiperItem>;
}

SwiperItem.displayName = "SwiperItem";
