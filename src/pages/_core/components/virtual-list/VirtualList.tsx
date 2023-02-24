/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/virtual-list/index.d.ts
 */
import React, { useContext, useMemo, useEffect, useRef } from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import { callBoth } from "../../../_util/call-both";
import { PageScroller } from "./pageScroller";

export interface VirtualListProps<T = any> {
  /**
   * 列表的高度
   */
  height: FixedSizeListProps<T>["height"];

  /**
   * 列表的宽度
   */
  width: FixedSizeListProps<T>["width"];

  /**
   * 列表的长度 */
  itemCount: FixedSizeListProps<T>["itemCount"];

  /**
   * 渲染数据
   */
  itemData: T;

  /**
   * 列表单项的大小，垂直滚动时为高度，水平滚动时为宽度
   */
  itemSize: number;

  /**
   * 项标识
   */
  itemKey?: FixedSizeListProps<T>["itemKey"];
  // /**
  //  * 布局方式，默认采用 "absolute"
  //  */
  // position?: "absolute" | "relative";

  /**
   * 初始滚动偏移值，水平滚动影响 scrollLeft，垂直滚动影响 scrollTop
   */
  initialScrollOffset?: FixedSizeListProps<T>["initialScrollOffset"];

  /**
   * 纵向滚动偏移
   */
  scrollTop?: number;

  /**
   * 横向滚动偏移
   */
  // scrollLeft?: number;

  /**
   * 底部区域
   */
  // renderBottom?: React.ReactNode;

  /**
   * 滚动方向。vertical 为垂直滚动，horizontal 为平行滚动。默认为 vertical
   */
  // layout?: "vertical" | "horizontal";

  /**
   * 列表滚动时调用函数 */
  onScroll?: FixedSizeListProps<T>["onScroll"];

  /**
   * 在可视区域之外渲染的列表单项数量，值设置得越高，快速滚动时出现白屏的概率就越小，相应地，每次滚动的性能会变得越差
   */
  overscanCount?: FixedSizeListProps<T>["overscanCount"];

  /**
   * 滚动项
   */
  children: any;

  // /**
  //  * 头部内容
  //  */
  // renderTop?: React.ReactNode;

  /**
   * 尾部内容
   */
  renderBottom?: React.ReactNode;

  /**
   * 是否注入 `isScrolling` 属性到 children 组件
   */
  useIsScrolling?: FixedSizeListProps<T>["useIsScrolling"];

  /**
   * 使用页面最外层滚动
   */
  usePageScroll?: boolean;
}

const ListContext = React.createContext<{
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}>({});

export default function VirtualList({
  usePageScroll,
  // renderTop,
  renderBottom,
  ...props
}: VirtualListProps) {
  const { scrollTop, itemSize } = props;
  const listRef = useRef(null);

  const outerElementType = useMemo(() => {
    return React.forwardRef<HTMLDivElement>(({ children, ...props }, ref) => {
      const { top, bottom } = useContext(ListContext);
      return (
        <div ref={ref} {...props}>
          {top}
          {children}
          {bottom}
        </div>
      );
    });
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(Math.floor(scrollTop / itemSize));
    }
  }, []);

  if (usePageScroll) {
    return (
      <ListContext.Provider value={{ bottom: renderBottom }}>
        <PageScroller>
          {({ ref, outerRef, style, onScroll }) => (
            <FixedSizeList
              {...props}
              ref={ref}
              outerRef={outerRef}
              height={window.innerHeight}
              style={style}
              onScroll={callBoth(onScroll, props.onScroll)}
              outerElementType={outerElementType}
            />
          )}
        </PageScroller>
      </ListContext.Provider>
    );
  }

  return (
    <ListContext.Provider value={{ bottom: renderBottom }}>
      <FixedSizeList
        {...props}
        ref={listRef}
        outerElementType={outerElementType}
      />
    </ListContext.Provider>
  );
}
