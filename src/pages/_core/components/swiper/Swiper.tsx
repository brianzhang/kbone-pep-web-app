/* eslint-disable react/no-this-in-sfc */
/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/swiper/swiper.tsx
 */
import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import SwiperJS, { SwiperOptions } from "swiper";
import {
  CommonEvent,
  CommonEventFunction,
  StandardProps,
} from "../types/common";
import { uuid } from "../../../_util/uuid";
import { noop } from "../../../_util/noop";
import { useDefault } from "../../../_util/use-default";
import { useIsReady } from "../../../_util/use-is-ready";
import { mergeRefs } from "../../../_util/merge-refs";

export interface ZoomOptions {
  maxRatio?: number;
  minRatio?: number;
  toggle?: boolean;
  containerClass?: string;
  zoomedSlideClass?: string;
}

export interface SwiperProps extends StandardProps {
  /** 是否显示面板指示点
   * @default false
   */
  indicatorDots?: boolean;

  /** 指示点颜色
   * @default "rgba(0, 0, 0, .3)"
   */
  indicatorColor?: string;

  /** 当前选中的指示点颜色
   * @default "#000000"
   */
  indicatorActiveColor?: string;

  /** 当前所在滑块的 index
   * @default 0
   */
  current?: number;

  /** 是否自动切换
   * @default false
   */
  autoplay?: boolean;

  /** 自动切换时间间隔
   * @default 5000
   */
  interval?: number;

  /** 滑动动画时长
   * @default 500
   */
  duration?: number;

  /** 是否采用衔接滑动
   * @default false
   */
  circular?: boolean;

  /** 滑动方向是否为纵向
   * @default false
   */
  vertical?: boolean;

  /**
   * 相邻项间距
   * @default 0
   */
  spaceBetween?: number;

  /**
   * 是否启用双击/触摸缩放功能
   * @default false
   */
  zoom?: boolean | ZoomOptions;

  /**
   * 前边距，可用于露出前一项的一小部分
   * @default 0
   */
  previousMargin?: number | string;

  /**
   * 后边距，可用于露出后一项的一小部分
   * @default 0
   */
  nextMargin?: number | string;

  /**
   * 同时显示的滑块数量
   * @default 1
   */
  displayMultipleItems?: number;

  /**
   * 设置 current 时是否启用动画
   * @default false
   * @supported h5
   */
  animationOnSetCurrent?: boolean;

  /** current 改变时会触发 change 事件
   */
  onChange?: CommonEventFunction;

  /** swiper-item 的位置发生改变时会触发 transition 事件
   * @supported weapp
   */
  onTransition?: CommonEventFunction;

  /** 动画结束时会触发 animationfinish 事件
   */
  onAnimationFinish?: CommonEventFunction;

  /**
   * 点击事件
   */
  onSwiperClick?: (index: number, context: { event: CommonEvent }) => void;

  /**
   * Swiper 实例
   */
  swiperRef?: React.Ref<SwiperJS>;
}

export const Swiper = React.forwardRef<HTMLDivElement, SwiperProps>(
  function Swiper(
    {
      vertical,
      indicatorDots,
      indicatorColor = "rgba(0, 0, 0, .3)",
      indicatorActiveColor = "#000000",
      previousMargin = 0,
      nextMargin = 0,
      circular,
      displayMultipleItems = 1,
      autoplay,
      interval = 5000,
      duration = 500,
      spaceBetween = 0,
      zoom = false,
      animationOnSetCurrent = false,
      className,
      children,
      style = {},
      onChange = noop,
      onAnimationFinish = noop,
      onSwiperClick = noop,
      onClick, // 留空外层控制
      swiperRef: outerRef,
      ...props
    },
    ref
  ) {
    const idRef = useRef(uuid());
    const elementRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperJS>(null);
    const ready = useIsReady();
    const currentRef = useRef(props.current);
    const [current, onCurrentChange] = useDefault(props.current, 0, current => {
      const event = {
        detail: {
          current,
          source: "",
        },
      };
      onChange(event as any);
    });

    // current
    useEffect(() => {
      currentRef.current = current;
      if (!ready || !swiperRef.current) {
        return;
      }
      const n = Number(current);
      if (Number.isNaN(n)) {
        return;
      }

      if (circular) {
        if (!swiperRef.current.isBeginning && !swiperRef.current.isEnd) {
          swiperRef.current.slideToLoop(
            n,
            animationOnSetCurrent ? undefined : 0
          ); // 更新下标
        }
      } else {
        swiperRef.current.slideTo(n, animationOnSetCurrent ? undefined : 0); // 更新下标
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    // circular
    useEffect(() => {
      if (!ready || !swiperRef.current) {
        return;
      }
      swiperRef.current.params.loop = circular;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [circular]);

    // circular
    useEffect(() => {
      if (!ready || !swiperRef.current) {
        return;
      }
      swiperRef.current.params.loop = circular;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [circular]);

    // interval
    useEffect(() => {
      if (!ready || !swiperRef.current) {
        return;
      }
      if (swiperRef.current.autoplay && autoplay) {
        swiperRef.current.params.autoplay = {
          delay: parseInt(String(interval), 10),
          disableOnInteraction: false,
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interval]);

    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    });

    useEffect(() => {
      const visited = [];
      const options: SwiperOptions = {
        pagination: {
          el: `.tea-core-swiper-${idRef.current} > .swiper-container > .swiper-pagination`,
        },
        direction: vertical ? "vertical" : "horizontal",
        loop: circular,
        slidesPerView: displayMultipleItems,
        initialSlide: current,
        speed: duration,
        zoom,
        observer: true,
        observeParents: true,
        spaceBetween,
        on: {
          slideChange() {
            if (currentRef.current !== this.realIndex) {
              onCurrentChange(this.realIndex);
            }
          },
          slideChangeTransitionStart() {
            const { $wrapperEl } = this;
            const { params } = this;
            if (!visited[this.realIndex]) {
              visited[this.realIndex] = true;
              $wrapperEl
                .children(`.${params.slideClass}.${params.slideDuplicateClass}`)
                .each(function () {
                  const idx = this.getAttribute("data-swiper-slide-index");
                  this.innerHTML = $wrapperEl
                    .children(
                      `.${params.slideClass}[data-swiper-slide-index="${idx}"]:not(.${params.slideDuplicateClass})`
                    )
                    .html();
                });
            }
          },
          slideChangeTransitionEnd() {
            this.slideToLoop(this.realIndex, 0, false);
          },
          transitionEnd() {
            const event = {
              detail: {
                current: this.realIndex,
                source: "",
              },
            };
            onAnimationFinish(event as any);
          },
          observerUpdate(e) {
            if (e.target && e.target.className === "swiper-wrapper") {
              if (e.addedNodes.length > 0 || e.removedNodes.length > 0) {
                this.loopDestroy();
                this.loopCreate();
              }
            }
          },
          click(event) {
            onSwiperClick(this.clickedIndex, { event });
          },
        } as any,
      };

      if (autoplay) {
        options.autoplay = {
          delay: parseInt(String(interval), 10),
          disableOnInteraction: false,
        };
      }

      swiperRef.current = new SwiperJS(
        `.tea-core-swiper-${idRef.current} > .swiper-container`,
        options
      );

      if (outerRef) {
        mergeRefs(outerRef)(swiperRef.current);
      }

      return () => {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vertical, circular, autoplay, spaceBetween, zoom]);

    return (
      <div
        key={`${vertical}-${circular}-${autoplay}`}
        ref={mergeRefs(ref, elementRef)}
        className={classNames(
          "tea-core-swiper",
          `tea-core-swiper-${idRef.current}`,
          className
        )}
        style={{
          ...style,
          ...(vertical
            ? {
                paddingTop: previousMargin,
                paddingBottom: nextMargin,
              }
            : {
                paddingLeft: previousMargin,
                paddingRight: nextMargin,
              }),
          overflow: "hidden",
        }}
      >
        <div className="swiper-container" style={{ overflow: "visible" }}>
          <style type="text/css">
            {`
              .tea-core-swiper-${idRef.current} > .swiper-container > .swiper-pagination > .swiper-pagination-bullet { background: ${indicatorColor} }
              .tea-core-swiper-${idRef.current} > .swiper-container > .swiper-pagination > .swiper-pagination-bullet-active { background: ${indicatorActiveColor} }
            `}
          </style>
          <div className="swiper-wrapper">{children}</div>
          <div
            className={classNames("swiper-pagination", {
              "swiper-pagination-hidden": !indicatorDots,
              "swiper-pagination-bullets": indicatorDots,
            })}
          />
        </div>
      </div>
    );
  }
);
