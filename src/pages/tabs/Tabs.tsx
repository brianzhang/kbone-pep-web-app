import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { ScrollView, Swiper, SwiperItem, View } from "@tarojs/components";
import { pxTransform } from "../_util/px-transform";
import { Icon, IconProps } from "../icon";
import { Badge, BadgeProps } from "../badge";
import { useDefault } from "../_util/use-default";
import { useIsReady } from "../_util/use-is-ready";
import { getRect } from "../_util/get-rect";
import { StyledProps } from "../_type";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";

/**
 * 选项卡（容器）组件 Props
 */
export interface TabsProps extends StyledProps {
  /**
   * children 必须使用 Tabs.Tab 组件来定义选项卡集合
   */
  children?: TabChild | TabChild[];

  /**
   * 当前激活的选项卡 ID，如传入组件为受控状态
   */
  activeId?: string;

  /**
   * 当用户激活指定选项卡时回调
   */
  onActive?: (activeId: string) => void;

  /**
   * 默认选中的选项卡 ID，如已传入 `activeId`，此属性会被忽略
   */
  defaultActiveId?: string;

  /**
   * 选项卡位置
   *
   * @default "top"
   */
  placement?: "top" | "bottom" | "left" | "right";

  /**
   * 选项卡内元素的排列方向（图标、文本、徽章）
   *
   * @default "row"
   */
  tabLayoutDirection?: "row" | "row-reverse" | "column" | "column-reverse";

  /**
   * 是否启用内容区域的滑动切换
   *
   * @default false
   */
  swipeable?: boolean;

  /**
   * 是否在垂直方向启用滑动切换 (`placement` 为 `"left" | "right"`)
   *
   * @default false
   */
  allowVerticalSwipe?: boolean;

  /**
   * 启用滑动切换后，可设置滑动区域高度
   */
  swipeContentHeight?: number | string;

  /**
   * 是否启用切换时动画
   *
   * **当前只支持 `swipeable` 模式下设置**
   *
   * @default true
   * @supported h5
   */
  animation?: boolean;
}

/**
 * 选项卡（面板）组件 Props
 */
export interface TabProps extends StyledProps {
  /**
   * 选项卡 ID，不能重复，会用于设置 key(h5)、wx:key(小程序)
   */
  id: string;

  /**
   * 选项卡标签
   */
  label?: React.ReactNode;

  /**
   * 选项卡内容
   */
  children?: React.ReactNode;

  /**
   * 选项卡图标
   */
  icon?: string | IconProps;

  /**
   * 选项卡徽章
   */
  badge?: BadgeProps;
}

export interface TabChild
  extends React.ReactElement<TabProps, typeof TabPanel> {
  /**
   * 请使用 `<Tabs.Tab>` 作为 `<Tabs>` 的 children
   */
  props: TabProps;
}

export const Tabs = forwardRefWithStatics(
  function Tabs(props: TabsProps, ref: React.Ref<any>) {
    const { classPrefix } = useConfig();
    const {
      children,
      placement = "top",
      swipeable,
      allowVerticalSwipe,
      swipeContentHeight,
      tabLayoutDirection,
      animation = true,
      className,
      style,
    } = props;

    const tabs = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children]
    );

    const [activeId, setActiveId] = useDefault(
      props.activeId,
      props.defaultActiveId || (tabs[0] ? tabs[0].props.id : undefined),
      props.onActive
    );
    const activeIndex = tabs.findIndex(x => x.props.id === activeId);

    // 在 activeId 变更之后，要更新 TabsBar 的滚动位置
    const ready = useIsReady();
    const [[scrollLeft, scrollTop], setScrollingPosition] = useState([0, 0]);
    const tabBarRef = useRef(null);
    const direction = ["top", "bottom"].includes(placement) ? "x" : "y";
    const updateScrollingPosition = useCallback(async () => {
      if (!ready) {
        return;
      }

      const [scrollRect] = await getRect(
        tabBarRef,
        `.${classPrefix}-tabs__scroll`
      );
      const tabRects = await getRect(tabBarRef, `.${classPrefix}-tabs__item`);

      if (activeIndex === -1 || !scrollRect || !tabRects[activeIndex]) {
        return;
      }

      const tabRect = tabRects[activeIndex];

      const size = direction === "x" ? "width" : "height";

      const offset = tabRects
        .slice(0, activeIndex)
        .reduce((prev, curr) => prev + curr[size], 0);

      const scrolling = offset - (scrollRect[size] - tabRect[size]) / 2;
      setScrollingPosition(size === "width" ? [scrolling, 0] : [0, scrolling]);
    }, [ready, classPrefix, activeIndex, direction]);

    useEffect(() => {
      if (ready) {
        updateScrollingPosition();
      }
    }, [ready, updateScrollingPosition]);

    const placementClassName = `${classPrefix}-tabs__placement--${placement}`;

    return (
      <div 
        className={classNames(
          `${classPrefix}-tabs`,
          placementClassName,
          className
        )}
        style={style}
        ref={ref}
      >
        <div className={`${classPrefix}-tabs__bar`} ref={tabBarRef}>
          <ScrollView
            className={`${classPrefix}-tabs__scroll`}
            scrollWithAnimation
            scrollX={direction === "x"}
            scrollY={direction === "y"}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            enhanced
            showScrollbar={false}
          >
            <div className={`${classPrefix}-tabs__list`}>
              {tabs.map(({ props: tab }) => {
                const activeClassName =
                  tab.id === activeId ? "is-active" : "is-inactive";
                const icon =
                  typeof tab.icon === "string" ? { name: tab.icon } : tab.icon;
                return (
                  // 选项卡按钮
                  <div 
                    key={tab.id}
                    className={classNames(
                      `${classPrefix}-tabs__item`,
                      activeClassName,
                      `${classPrefix}-tabs__direction--${tabLayoutDirection}`,
                      tab.className
                    )}
                    style={tab.style}
                    onClick={() => {
                      setActiveId(tab.id);
                    }}
                  >
                    {icon && (
                      <Icon
                        size={TaroEnv ? 36 : 18}
                        {...icon}
                        className={classNames(
                          `${classPrefix}-tabs__icon`,
                          activeClassName,
                          icon.className
                        )}
                      />
                    )}
                    <div className={`${classPrefix}-tabs__label`}>
                      {tab.label}
                    </div>
                    {tab.badge && (
                      <Badge
                        {...tab.badge}
                        className={classNames(
                          `${classPrefix}-tabs__badge`,
                          tab.badge.className
                        )}
                      />
                    )}
                    {tab.id === activeId && (
                      <div 
                        className={classNames(
                          `${classPrefix}-tabs__line`,
                          activeClassName
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollView>
          {/* 盖住滚动条 */}
          <div className={`${classPrefix}-tabs__lid`} />
        </div>

        {swipeable ? (
          <Swiper
            key={direction}
            className={`${classPrefix}-tabs__panel`}
            current={activeIndex}
            vertical={direction === "y" && allowVerticalSwipe}
            onChange={event => {
              const { current } = event.detail;
              setActiveId(tabs[current].props.id);
            }}
            duration={240}
            style={{
              height:
                typeof swipeContentHeight === "number"
                  ? pxTransform(swipeContentHeight, 750)
                  : swipeContentHeight,
            }}
            {...({ animationOnSetCurrent: animation } as any)}
          >
            {tabs.map(({ props: tab }) => (
              <SwiperItem
                key={tab.id}
                className={`${classPrefix}-tabs__content`}
              >
                {tab.children}
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <div className={`${classPrefix}-tabs__panel`}>
            {tabs.map(({ props: tab }) => (
              <div 
                key={tab.id}
                className={classNames(
                  `${classPrefix}-tabs__content`,
                  tab.id === activeId ? "is-active" : "is-inactive"
                )}
              >
                {tab.id === activeId ? tab.children : null}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  {
    Tab: TabPanel,
  }
);

Tabs.displayName = "Tabs";

function TabPanel(props: TabProps) {
  return <div />;
}

TabPanel.displayName = "TabPanel";
