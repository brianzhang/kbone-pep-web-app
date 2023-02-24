import React from "react";
import classNames from "classnames";
import { ITouchEvent, View } from "@tarojs/components";
import { Row, Col } from "../flex";
import { Icon, IconProps } from "../icon";
import { StyledProps } from "../_type";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface GridItem extends StyledProps {
  /**
   * 图标名称或图片链结，可选值请查阅 Icon 组件
   */
  icon?: string | IconProps;

  /**
   * 标题文字
   */
  title?: React.ReactNode;

  /**
   * 标题下方的描述信息
   */
  description?: React.ReactNode;

  /**
   * 点击回调函数
   */
  onClick?: (
    item: GridItem,
    context: { event: ITouchEvent; index: number }
  ) => void;

  [key: string]: any;
}

export interface GridProps extends StyledProps {
  /**
   * 宫格布局各元素数据
   * @default []
   */
  data?: GridItem[];

  /**
   * 宫格元素之间的间距
   * @default 0
   */
  gutter?: number;

  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;

  /**
   * 每一列有多少个
   * @default 3
   */
  columnNum?: 1 | 2 | 3 | 4 | 5 | 6 | 12;

  /**
   * 是否将宫格元素固定为正方形
   * @default false
   */
  square?: boolean;

  /**
   * 图标大小。默认单位为 px，支持自带单位
   * @default 64 (750)
   */
  iconSize?: number | string;

  /**
   * 点击回调函数
   */
  onClick?: (
    item: GridItem,
    context: { event: ITouchEvent; index: number }
  ) => void;
}

export function Grid({
  data = [],
  gutter = 0,
  bordered = true,
  columnNum = 3,
  square = false,
  iconSize = TaroEnv ? 64 : 32,
  onClick,
  className,
  style,
}: GridProps) {
  const { classPrefix } = useConfig();
  const span = columnNum === 5 ? 1 : 12 / columnNum;

  const handleClick = (
    event: ITouchEvent,
    { onClick: itemOnClick, ...item }: GridItem,
    index: number
  ): void => {
    event.stopPropagation();
    onClick && onClick(item, { event, index });
    itemOnClick && itemOnClick(item, { event, index });
  };

  return (
    <div 
      className={classNames(`${classPrefix}-grid`, className, {
        [`${classPrefix}-grid--bordered`]: bordered && gutter === 0,
      })}
      style={style}
    >
      <Row gutter={gutter} based={columnNum === 5 ? 5 : 12}>
        {data.map((item, index) => {
          const iconProps =
            typeof item.icon === "string"
              ? { name: item.icon }
              : item.icon || {};
          return (
            <Col key={`${index}-${item.title}-${item.description}`} span={span}>
              <div 
                className={classNames(
                  `${classPrefix}-grid-item`,
                  item.className,
                  {
                    [`${classPrefix}-grid-item--square`]: square,
                    [`${classPrefix}-grid-item--bordered`]:
                      bordered && gutter === 0,
                    [`${classPrefix}-grid-item--bordered-surrounded`]:
                      bordered && gutter > 0,
                    "is-clickable":
                      typeof onClick === "function" ||
                      typeof item.onClick === "function",
                  }
                )}
                onClick={e => handleClick(e, item, index)}
                style={item.style}
              >
                <div 
                  className={classNames(`${classPrefix}-grid-item__content`, {
                    [`${classPrefix}-grid-item__content--square`]: square,
                  })}
                >
                  <Icon
                    className={`${classPrefix}-grid-item__icon`}
                    size={iconSize}
                    {...iconProps}
                  />
                  <div className={`${classPrefix}-grid-item__text`}>
                    <div 
                      className={`${classPrefix}-grid-item__title ${classPrefix}-ellipsis`}
                    >
                      {item.title}
                    </div>
                    <div 
                      className={`${classPrefix}-grid-item__description ${classPrefix}-ellipsis`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
