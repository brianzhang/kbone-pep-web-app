import React from "react";
import classNames from "classnames";
import { CommonProps } from "../_type";
import { Typography, TypographyTextProps } from "../typography";
import { Icon, IconProps } from "../icon/Icon";
import { useConfig } from "../_util/use-config";

const themeMap: Record<
  StatisticInfoProps["type"],
  [TypographyTextProps["theme"], IconProps["name"]]
> = {
  up: ["danger", "arrowup"],
  down: ["success", "arrowdown"],
  default: ["light", null],
};

export interface StatisticInfoProps extends CommonProps {
  /**
   * 信息类型
   * @default "default"
   */
  type?: "default" | "up" | "down";
}

export function StatisticInfo({
  type = "default",
  className,
  children,
  ...props
}: StatisticInfoProps) {
  const { classPrefix } = useConfig();
  const [theme, icon] = themeMap[type] || [];
  return (
    <Typography.Text
      size="xs"
      theme={theme}
      className={classNames(`${classPrefix}-statistic__info`, className)}
      block
      {...props}
    >
      {children}
      {icon && <Icon name={icon} />}
    </Typography.Text>
  );
}
