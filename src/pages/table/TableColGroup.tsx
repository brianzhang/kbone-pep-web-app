import React from "react";
import { View } from "@tarojs/components";
import { useConfig } from "../_util/use-config";
import { pxTransform } from "../_util/px-transform";
import { TableColumn } from "./TableProps";

export interface TableColGroupProps {
  columns: TableColumn[];
}

export function TableColGroup({ columns }: TableColGroupProps) {
  const { classPrefix } = useConfig();
  return (
    <div className={`${classPrefix}-table__colgroup`}>
      {columns.map(({ key, width = "auto" }) => (
        <div 
          className={`${classPrefix}-table__col`}
          key={key}
          style={{
            width: typeof width === "number" ? pxTransform(width, 750) : width,
          }}
        />
      ))}
    </div>
  );
}

TableColGroup.displayName = "TableColGroup";
