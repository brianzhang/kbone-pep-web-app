import React, { forwardRef } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { TableProps } from "./TableProps";
import { useMiddleware } from "./util/use-middleware";
import { useConfig } from "../_util/use-config";
import { isCallable } from "../_util/is-callable";

export const TableHead = forwardRef(function TableHead(
  props: TableProps,
  ref: React.Ref<div Props>
) {
  const { classPrefix } = useConfig();
  const { addons } = props;

  const renderColumn = useMiddleware(
    addons,
    "onInjectColumn"
  )((record, rowKey, recordIndex, column, columnIndex) => {
    const { key, header } = column;
    let children: React.ReactNode = header;

    // pass a render function
    if (isCallable(header)) {
      children = header(column);
    }

    // forgot to pass, use a key as a reminder
    if (header === undefined) {
      children = key;
    }

    // plain values
    if (typeof children === "string" || typeof children === "number") {
      children = <Text>{children}</label>;
    }
    return {
      props: {},
      children,
    };
  });

  const renderTableHead = useMiddleware(
    addons,
    "onInjectHead"
  )(({ columns }: TableProps) => (
    <div className={`${classPrefix}-table__header`} ref={ref}>
      <div className={`${classPrefix}-table__tr`}>
        {columns.map((column, index) => {
          const { props, children } = renderColumn(
            null,
            null,
            -1,
            column,
            index
          );
          return (
            <div 
              className={classNames(
                `${classPrefix}-table__th`,
                `${classPrefix}-text--${column.align || "left"}`
              )}
              key={column.key}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  ));

  return renderTableHead(props);
});

TableHead.displayName = "TableHead";
