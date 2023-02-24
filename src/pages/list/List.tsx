import React from "react";
import classNames from "classnames";
import { ScrollView, View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { ListItem } from "./ListItem";
import { ListContext } from "./ListContext";
import { ListDivider } from "./ListDivider";
import { useConfig } from "../_util/use-config";

export interface ListProps extends StyledProps {
  /**
   * 标题
   */
  title?: React.ReactNode;

  /**
   * 尾部内容
   */
  footer?: React.ReactNode;

  /**
   * 列表内容
   */
  children?: React.ReactNode;

  /**
   * 启用纵向滚动
   */
  scrollY?: boolean;

  // /**
  //  * 外边框样式
  //  * @default false
  //  */
  // bordered?: boolean | "top" | "bottom";
}

export function List({
  title,
  footer,
  scrollY,
  children,
  className,
  ...props
}: ListProps) {
  const { classPrefix } = useConfig();
  const content = (
    <div>
      {typeof title !== "undefined" && (
        <div className={`${classPrefix}-list__title`}>{title}</div>
      )}
      <div 
        className={classNames(`${classPrefix}-list__wrap`, {
          // [`${classPrefix}-hairline--${bordered || "horizontal"}`]: bordered,
        })}
      >
        <ListContext.Provider value={{}}>{children}</ListContext.Provider>
      </div>
      {typeof footer !== "undefined" && (
        <div className={`${classPrefix}-list__footer`}>{footer}</div>
      )}
    </div>
  );

  if (scrollY) {
    return (
      <ScrollView
        scrollY
        className={classNames(`${classPrefix}-list`, "scroll-y", className)}
        {...props}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <div className={classNames(`${classPrefix}-list`, className)} {...props}>
      {content}
    </div>
  );
}

List.Item = ListItem;
List.Divider = ListDivider;
