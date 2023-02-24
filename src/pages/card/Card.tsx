import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { CommonProps } from "../_type";
import { Typography } from "../typography";
import { Level } from "../level";
import { useConfig } from "../_util/use-config";

export interface CardProps extends CommonProps {}

export function Card({ className, children, ...props }: CardProps) {
  const { classPrefix } = useConfig();
  return (
    <div className={classNames(`${classPrefix}-card`, className)} {...props}>
      {children}
    </div>
  );
}

export interface CardHeaderProps extends CommonProps {
  /**
   * 卡片头部右侧区域内容（可选）
   */
  extra?: React.ReactNode;
}

export interface CardBodyProps extends CommonProps {
  /**
   * 内容区标题（可选）
   */
  title?: React.ReactNode;

  /**
   * 内容区小标题（可选）
   */
  subtitle?: React.ReactNode;

  /**
   * 内容区标题右侧区域内容（可选）
   */
  extra?: React.ReactNode;
}
export interface CardFooterProps extends CommonProps {}

Card.Header = function CardHeader({
  className,
  children,
  extra,
  ...props
}: CardHeaderProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-card__header`,
        `${classPrefix}-hairline--bottom`,
        className
      )}
      {...props}
    >
      <Level
        start={
          <div>
            <Typography.Heading level={3}>{children}</Typography.Heading>
          </div>
        }
        end={extra}
      />
    </div>
  );
};

Card.Body = function CardBody({
  className,
  children,
  title,
  subtitle,
  extra,
  ...props
}: CardBodyProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-card__body`, className, {
        "with-title": title || subtitle || extra,
      })}
      {...props}
    >
      {(title || subtitle || extra) && (
        <Level
          className={`${classPrefix}-card__title`}
          start={
            <div>
              <Typography.Heading level={3}>{title}</Typography.Heading>
              <Typography.Text
                className={`${classPrefix}-card__subtitle" theme="light`}
              >
                {subtitle}
              </Typography.Text>
            </div>
          }
          end={extra}
        />
      )}
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-card__footer`,
        `${classPrefix}-hairline--top`,
        className
      )}
      {...props}
    />
  );
};
