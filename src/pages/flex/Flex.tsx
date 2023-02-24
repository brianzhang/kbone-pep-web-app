import React, { useContext } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { pxTransform } from "../_util/px-transform";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface RowProps extends StyledProps {
  /**
   * 元素间隔
   * @default 32 (750)
   */
  gutter?: number;

  /**
   * 元素超出 flex 容器时处理方式
   * @default "wrap"
   */
  flexWrap?: "wrap" | "nowrap";

  /**
   * 设置 flex-direction: row-reverse;
   * @default false
   */
  reverse?: boolean;

  /**
   * flex 布局下的垂直排列方式
   * @default "stretch"
   */
  align?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

  /**
   * flex 布局下的水平排列方式
   * @default "flex-start"
   */
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly";

  /**
   * 包括的栅格列，请使用 <Col /> 作为子节点
   */
  children?: ColChild | ColChild[];

  /**
   * 栅格的单位列数，分为 5 列和 12 列
   * @default 12
   */
  based?: 5 | 12;
}

export interface ColProps extends StyledProps {
  /**
   * flex 布局属性
   */
  flex?: string | number;

  /**
   * Col 向右偏移列的数量
   * @default 0
   */
  offset?: number;

  /**
   * 栅格顺序
   * @default 0
   */
  order?: number;

  /**
   * 栅格占位格数
   */
  span?: number;

  /**
   * 栅格单元中内容
   */
  children?: React.ReactNode;
}

interface ColChild extends React.ReactElement<ColProps, typeof Col> {}

interface FlexContextValue {
  based?: 5 | 12;
  gutter: number;
}

const FlexContext = React.createContext<FlexContextValue>({
  based: 12,
  gutter: 32,
});

export function Row({
  gutter = TaroEnv ? 32 : 16,
  flexWrap = "wrap",
  reverse = false,
  align = "stretch",
  justify = "flex-start",
  children,
  className,
  style,
  based = 12,
}: RowProps) {
  const { classPrefix } = useConfig();
  let flex: FlexContextValue = null;
  let rowStyle: React.CSSProperties = null;

  // 定义了 gutter 的，才生成一个 flex 上下文，否则使用默认样式即可
  if (typeof gutter === "number") {
    const gutterCompensation = Math.ceil(Number(gutter) / 2) * -1;
    flex = {
      gutter,
      based,
    };
    rowStyle = {
      marginLeft: pxTransform(gutterCompensation, 750),
      marginRight: pxTransform(gutterCompensation, 750),
    };
  }

  rowStyle = {
    ...(rowStyle || {}),
    ...(style || {}),
  };

  const rowClassName = classNames(`${classPrefix}-row`, className, {
    [`${classPrefix}-flex-wrap-nowrap`]: flexWrap === "nowrap",
    [`${classPrefix}-align-items-${align}`]: typeof align !== "undefined",
    [`${classPrefix}-justify-content-${justify}`]:
      typeof justify !== "undefined",
    [`${classPrefix}-flex-row-reverse`]: reverse,
  });

  return (
    <div className={rowClassName} style={rowStyle}>
      <FlexContext.Provider value={flex}>{children}</FlexContext.Provider>
    </div>
  );
}

export function Col({
  children,
  className,
  offset = 0,
  order = 0,
  flex: flexStyle,
  span,
  style,
}: ColProps) {
  const { classPrefix } = useConfig();
  const flex = useContext(FlexContext);
  const { based } = flex;

  let colStyle: React.CSSProperties = null;
  if (flex) {
    const gutterCompensation = Math.ceil(Number(flex.gutter) / 2);
    colStyle = {
      paddingLeft: pxTransform(gutterCompensation, 750),
      paddingRight: pxTransform(gutterCompensation, 750),
    };
  }

  colStyle = {
    ...(colStyle || {}),
    ...(style || {}),
  };

  return (
    <div 
      className={classNames(`${classPrefix}-col`, className, {
        [`col-offset-${offset}-${based}`]: offset >= 1 && offset <= 11,
        [`col-${span}-${based}`]: span >= 1 && span <= 12,
      })}
      style={{
        ...colStyle,
        order,
        flex: flexStyle,
      }}
    >
      {children}
    </div>
  );
}
