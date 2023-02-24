import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { Col, Row } from "../flex";
import { useConfig } from "../_util/use-config";

export interface StatisticBoardProps extends StyledProps {
  /**
   * 面板布局列数
   *
   * @default 1
   */
  col?: 1 | 2 | 3;

  /**
   * 统计项
   */
  children?: React.ReactElement | React.ReactElement[];
}

export function StatisticBoard({
  col = 1,
  className,
  children,
  ...props
}: StatisticBoardProps) {
  const { classPrefix } = useConfig();
  if (typeof col !== "number" || col > 3) {
    // eslint-disable-next-line no-param-reassign
    col = 1;
  }

  const items: React.ReactElement[][] = [];
  let curRow = 0;
  React.Children.forEach(children, child => {
    if (!items[curRow]) {
      items[curRow] = [];
    }
    items[curRow].push(child);
    if (items[curRow].length === col) {
      curRow += 1;
    }
  });

  return (
    <div 
      className={classNames(`${classPrefix}-statistic__board`, className)}
      {...props}
    >
      {items.map((row, index) => (
        <Row key={index} gutter={0} className={`${classPrefix}-statistic__row`}>
          {row.map((child, index) => (
            <Col key={index} span={12 / col}>
              {child}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}
