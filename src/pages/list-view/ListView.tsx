import React, { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
import { getSystemInfoSync } from "@tarojs/taro";
import { callBoth } from "../_util/call-both";
import { noop } from "../_util/noop";
import { getRect } from "../_util/get-rect";
import { StyledProps } from "../_type";
import { useIsReady } from "../_util/use-is-ready";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface ListViewChildProps<T = any> {
  index: number;
  style: React.CSSProperties;
  data: T;
  isScrolling?: boolean;
}

export interface ListViewOnScrollProps {
  scrollDirection: "forward" | "backward";
  scrollOffset: number;
  scrollUpdateWasRequested: boolean;
}

export interface ListViewProps<T = any> extends StyledProps {
  /**
   * 列表单项高度
   */
  itemSize?: number;

  /**
   * 列表项数据
   */
  itemData?: T[];

  /**
   * 列表项标识
   */
  itemKey?: (data: T, index: number) => number | string;

  /**
   * 列表项渲染
   */
  itemRender: (props: ListViewChildProps<T>) => React.ReactNode;

  /**
   * 列表高
   */
  height?: string | number;

  /**
   * 列表高
   * @default "100%"
   */
  width?: number | string;

  /**
   * 纵向滚动偏移
   */
  scrollTop?: number;

  /**
   * 横向滚动偏移
   */
  // scrollLeft?: number;

  // /**
  //  * 头部内容
  //  *
  //  * *Taro 端暂不支持*
  //  *
  //  * @supported h5
  //  */
  // header?: React.ReactNode;

  /**
   * 尾部内容
   */
  footer?: React.ReactNode;

  /**
   * 滚动事件
   */
  onScroll?: (props: ListViewOnScrollProps) => void;

  /**
   * 滚动到底部事件
   */
  onScrollBottom?: (props: ListViewOnScrollProps) => void;

  /**
   * 调用滚动至底部事件的距离临界值，单位为像素
   * @default 10
   */
  scrollBottomThreshold?: number;

  /**
   * 在可视区域之外渲染的列表单项数量
   *
   * 值设置得越高，快速滚动时出现白屏的概率就越小，相应地，每次滚动的性能会变得越差
   * @default 1
   */
  overscanCount?: number;

  /**
   * 是否注入 `isScrolling` 属性到 children 组件
   */
  useIsScrolling?: boolean;

  /**
   * 使用页面最外层滚动
   *
   * *Taro 端暂不支持*
   *
   * @supported h5
   */
  usePageScroll?: boolean;
}

const getWindowHeight = () => {
  return TaroEnv === "weapp"
    ? getSystemInfoSync().windowHeight
    : window.innerHeight;
};

const defaultRender = ({ style }) => <div style={style} />;
const defaultKey = (_, index) => index;

export function ListView<T = any>({
  itemData = [],
  itemRender = defaultRender,
  itemSize = 40,
  itemKey = defaultKey,
  usePageScroll,
  height = usePageScroll ? getWindowHeight() : undefined,
  width = "100%",
  // header,
  footer,
  onScroll,
  onScrollBottom = noop,
  scrollBottomThreshold = 10,
  useIsScrolling,
  overscanCount,
  className,
  scrollTop = 0,
  // scrollLeft = 0,
  ...props
}: ListViewProps<T>) {
  const { classPrefix } = useConfig();
  const listRef = useRef<HTMLDivElement>(null);
  const listHeightRef = useRef<number>(0);

  const ready = useIsReady();

  useEffect(() => {
    if (usePageScroll && typeof window !== "undefined") {
      listHeightRef.current = getWindowHeight() || 0;
    } else if (ready) {
      getRect(listRef).then(rect => {
        if (rect?.[0]) {
          listHeightRef.current = rect[0].height;
        }
      });
    }
  }, [height, usePageScroll, ready]);

  const row = useCallback(
    ({ data, index, ...props }) => {
      return itemRender({ ...props, data: data[index] });
    },
    [itemRender]
  );

  const key = useCallback(
    (index, data) => {
      return itemKey(data[index], index);
    },
    [itemKey]
  );

  const h5Props = {
    itemKey: key,
    usePageScroll,
  };

  async function handleScroll(props: ListViewOnScrollProps) {
    const { scrollDirection, scrollOffset } = props;
    if (
      scrollDirection === "forward" &&
      Math.ceil(scrollOffset + listHeightRef.current) >=
        itemData.length * itemSize - scrollBottomThreshold
    ) {
      onScrollBottom(props);
    }
  }

  return (
    <div 
      ref={listRef}
      className={classNames(`${classPrefix}-list-view`, className)}
      {...props}
    >
      <VirtualList
        height={height}
        width={width}
        itemData={itemData}
        itemCount={itemData.length}
        itemSize={itemSize}
        scrollTop={scrollTop}
        // scrollLeft={scrollLeft}
        useIsScrolling={useIsScrolling}
        // renderTop={header}
        renderBottom={footer}
        overscanCount={overscanCount}
        onScroll={callBoth(onScroll, handleScroll)}
        {...(h5Props as any)}
      >
        {row as any}
      </VirtualList>
    </div>
  );
}
