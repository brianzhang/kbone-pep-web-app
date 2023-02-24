import React, { useState } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { Icon } from "../icon";
import { Search, SearchProps } from "../search";
import { Col, Row } from "../flex";
import { callBoth } from "../_util/call-both";
import { useConfig } from "../_util/use-config";

export interface HeaderBarSearchProps extends Omit<SearchProps, "showCancel"> {}

export interface HeaderBarProps extends StyledProps {
  /**
   * 顶栏内容
   */
  children?: React.ReactNode;

  /**
   * 是否附带搜索功能
   * @default false
   */
  searchable?: false | HeaderBarSearchProps;
}

export function HeaderBar({
  children,
  searchable,
  className,
  ...props
}: HeaderBarProps) {
  const { classPrefix } = useConfig();
  const [showSearch, setShowSearch] = useState(false);

  const content = searchable ? (
    <div>
      {!showSearch ? (
        <div>
          <Row gutter={0} style={{ flexGrow: 1 }}>
            {React.Children.map(children, child => (
              <Col span={4}>{child}</Col>
            ))}
          </Row>
          {searchable && (
            <Icon
              name="search"
              className={`${classPrefix}-headerbar__search`}
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>
      ) : (
        showSearch && (
          <Search
            {...searchable}
            focus
            showCancel
            onCancel={callBoth(() => setShowSearch(false), searchable.onCancel)}
          />
        )
      )}
    </div>
  ) : (
    <Row gutter={0}>
      {React.Children.map(children, child => (
        <Col>{child}</Col>
      ))}
    </Row>
  );

  return (
    <div 
      className={classNames(`${classPrefix}-headerbar`, className, {
        "with-search": searchable,
      })}
      {...props}
    >
      {content}
    </div>
  );
}
