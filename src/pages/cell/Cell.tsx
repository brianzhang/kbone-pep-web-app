import React from "react";
import classNames from "classnames";
import { CommonEventFunction, View } from "@tarojs/components";
import { CommonProps } from "../_type";
import { Icon, IconProps } from "../icon";
import { Tag } from "../tag";
import { useConfig } from "../_util/use-config";

export interface CellProps extends CommonProps {
  /**
   * 标题
   */
  title?: React.ReactNode;

  /**
   * 描述
   */
  description?: React.ReactNode;

  /**
   * 标题前图标
   */
  icon?: string | IconProps;

  /**
   * 标题后标签
   */
  tag?: string | React.ReactNode;

  /**
   * 项右侧点击区域
   */
  extra?: React.ReactNode;

  /**
   * 底部区域
   */
  footer?: React.ReactNode;

  /**
   * 标题是否超长省略
   * @default true
   */
  titleEllipsis?: boolean;

  /**
   * 内容区点击回调
   */
  onClick?: CommonEventFunction;
}

export function Cell({
  title,
  titleEllipsis = true,
  description,
  tag,
  icon,
  extra,
  children,
  footer,
  className,
  onClick,
  ...props
}: CellProps) {
  const { classPrefix } = useConfig();
  const iconProps = typeof icon === "string" ? { name: icon } : icon || {};
  return (
    <div 
      className={classNames(`${classPrefix}-cell`, className, {
        "with-extra": !footer && !!extra,
      })}
      {...props}
    >
      <div className={`${classPrefix}-cell__content`}>
        <div onClick={onClick}>
          <div className={`${classPrefix}-cell__header`}>
            {icon && (
              <div className={`${classPrefix}-cell__header-icon`}>
                <Icon {...iconProps} />
              </div>
            )}
            <div 
              className={classNames(
                `${classPrefix}-cell__title`,
                titleEllipsis && `${classPrefix}-ellipsis`
              )}
            >
              {title}
            </div>
            {typeof tag !== "undefined" && (
              <div className={`${classPrefix}-cell__tag`}>
                {typeof tag === "string" ? (
                  <Tag type="success" round>
                    {tag}
                  </Tag>
                ) : (
                  tag
                )}
              </div>
            )}
          </div>
          <div className={`${classPrefix}-cell__body`}>
            {description && (
              <div className={`${classPrefix}-cell__description`}>
                {description}
              </div>
            )}
            {children}
          </div>
        </div>
        <div className={`${classPrefix}-cell__footer`}>{footer}</div>
      </div>
      {!footer && extra && (
        <div className={`${classPrefix}-cell__extra`}>{extra}</div>
      )}
    </div>
  );
}
