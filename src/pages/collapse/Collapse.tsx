import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { CollapseContext, CollapseContextValue } from "./CollapseContext";
import { useDefault } from "../_util/use-default";
import { CollapsePanel } from "./CollapsePanel";
import { useConfig } from "../_util/use-config";

export interface CollapseProps extends StyledProps {
  /**
   * 是否为手风琴模式
   * @default false
   */
  accordion?: boolean;

  /**
   * 当前激活的面板 ID 组
   */
  activeIds?: CollapseContextValue["activeIds"];

  /**
   * 默认激活的面板 ID 组
   */
  defaultActiveIds?: CollapseContextValue["activeIds"];

  /**
   * 面板激活变化回调
   */
  onActive?: CollapseContextValue["onActive"];

  /**
   * 面板项
   */
  children?: React.ReactElement | React.ReactElement[];
}

export function Collapse({
  accordion,
  activeIds,
  defaultActiveIds = [],
  onActive,
  children,
  className,
  style,
}: CollapseProps) {
  const { classPrefix } = useConfig();
  const [value, onChange] = useDefault(activeIds, defaultActiveIds, onActive);

  const handleChange: CollapseContextValue["onActive"] = (
    activeIds,
    { event, activeId, active }
  ) => {
    if (!accordion) {
      onChange(activeIds, { event, activeId, active });
    } else {
      onChange(active ? [activeId] : [], { event, activeId, active });
    }
  };

  return (
    <div 
      className={classNames(`${classPrefix}-collapse`, className)}
      style={style}
    >
      <CollapseContext.Provider
        value={{
          activeIds: value,
          onActive: handleChange,
        }}
      >
        {children}
      </CollapseContext.Provider>
    </div>
  );
}

Collapse.Panel = CollapsePanel;
