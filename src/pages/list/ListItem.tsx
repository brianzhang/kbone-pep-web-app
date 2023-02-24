/* eslint-disable no-param-reassign */
import React, { useRef } from "react";
import classNames from "classnames";
import { Image, ITouchEvent, View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { Icon, IconProps } from "../icon";
import { isChildOfType } from "../_util/is-child-of-type";
import { CheckInstance } from "../check";
import { Checkbox } from "../checkbox";
import { Radio } from "../radio";
import { useConfig } from "../_util/use-config";

export interface ListItemProps extends StyledProps {
  /**
   * 列表项内容
   */
  children?: React.ReactNode;

  /**
   * 列表项标题
   */
  title?: React.ReactNode;

  /**
   * 列表项小标题
   */
  description?: React.ReactNode;

  /**
   * 是否显示箭头
   * @default false
   */
  arrow?: boolean;

  /**
   * 点击回调
   */
  onClick?: (event: ITouchEvent<any>) => void;

  /**
   * 前置图标
   */
  icon?: string | IconProps;

  /**
   * 缩略图
   */
  thumb?: string;

  /**
   * 前缀内容
   *
   * ** 与 `icon` 及 `thumb` 不能共存 **
   */
  before?: React.ReactNode;

  /**
   * 列表项大小
   * @default "default"
   */
  size?: "default" | "auto";

  // /**
  //  * 是否显示间隔边框
  //  * @default false
  //  */
  // bordered?: boolean;

  // /**
  //  * 列表项标题宽度
  //  */
  // titleWidth?: number | string;

  // /**
  //  * 内容是否靠左对齐
  //  * @default false
  //  */
  // alignLeft?: boolean;
}

export function ListItem({
  title,
  description,
  arrow,
  icon,
  thumb,
  children,
  before,
  className,
  onClick,
  size,
  ...props
}: ListItemProps) {
  const { classPrefix } = useConfig();
  const ref = useRef<CheckInstance>(null);

  // children 包含 Check 时整行可点击
  if (isChildOfType(children, Checkbox) || isChildOfType(children, Radio)) {
    // eslint-disable-next-line no-param-reassign
    children = React.cloneElement(children, { ref });
    // eslint-disable-next-line no-param-reassign
    onClick = event => {
      ref.current && ref.current.trigger(event);
    };
  }

  // before 包含 Check 时整行可点击
  if (isChildOfType(before, Checkbox) || isChildOfType(before, Radio)) {
    before = (
      <div style={{ fontSize: 0 }}>{React.cloneElement(before, { ref })}</div>
    );
    onClick = event => {
      ref.current && ref.current.trigger(event);
    };
  }

  if (before) {
    before = <div className={`${classPrefix}-item__left-icon`}>{before}</div>;
  }

  if (thumb) {
    size = "auto";
    before = (
      <div className={`${classPrefix}-item__thumb--left`}>
        <div className={`${classPrefix}-item__thumb`}>
          <Image
            className={`${classPrefix}-item__thumb-image`}
            src={thumb}
            mode="scaleToFill"
          />
        </div>
      </div>
    );
  }

  if (icon) {
    if (typeof icon === "string") {
      icon = { name: icon };
    }
    before = (
      <Icon
        {...icon}
        className={classNames(`${classPrefix}-item__left-icon`, icon.className)}
      />
    );
  }

  const hasDescription = typeof description !== "undefined";

  return (
    <div 
      className={classNames(
        `${classPrefix}-item`,
        `${classPrefix}-hairline--bottom`,
        className,
        {
          "is-clickable": arrow || onClick,
          "size-sm": size !== "auto" && !hasDescription,
          "size-lg": size !== "auto" && hasDescription,
          "size-auto": size === "auto",
        }
      )}
      onClick={onClick}
      {...props}
    >
      {before}
      <div className={classNames(`${classPrefix}-item__body`)}>
        {typeof title !== "undefined" && (
          <div className={`${classPrefix}-item__title`}>{title}</div>
        )}
        {hasDescription && (
          <div className={`${classPrefix}-item__description`}>
            {description}
          </div>
        )}
      </div>
      <div className={`${classPrefix}-item__value `}>{children}</div>
      {arrow && (
        <Icon
          className={`${classPrefix}-item__detail-icon`}
          name="chevronright"
          color="#bbbbbb"
        />
      )}
    </div>
  );
}
