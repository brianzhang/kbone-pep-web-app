import React, { forwardRef, Fragment, useRef, useContext } from "react";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { ViewProps } from "@tarojs/components/types/View";
import { TableProps } from "./TableProps";
import { getRowKeyFromRecordKey } from "./util/get-row-key-from-record-key";
import { useMiddleware } from "./util/use-middleware";
import { useConfig } from "../_util/use-config";
import { getValueByPathKey } from "./util/get-value-by-path-key";

// 表格组件核心实现
export const TableBody = forwardRef(function TableBody(
  { columns, records, addons, recordKey, rowDisabled }: TableProps,
  ref: React.Ref<div Props>
) {
  const { classPrefix } = useConfig();
  // 键值的获取方式
  const getRowKey = getRowKeyFromRecordKey(recordKey);

  // 列渲染：(record, column) => { props, children }
  const renderColumn = useMiddleware(
    addons,
    "onInjectColumn"
  )((record, rowKey, recordIndex, column, columnIndex) => {
    let children = null;
    if (isFunction(column.render)) {
      children = column.render(record, {
        rowKey,
        recordIndex,
        column,
        columnIndex,
      });
    } else if (typeof record === "object" && record) {
      children = getValueByPathKey(record, column.key);
    }
    if (typeof children === "undefined") {
      // never render undefined
      children = null;
    }
    if (typeof children !== "object") {
      children = <Text>{children}</label>;
    }
    return {
      props: {},
      children,
    };
  });

  // 行渲染：(columns, record) => { prepends, row, appends }
  const renderRow = useMiddleware(
    addons,
    "onInjectRow"
  )((record, rowKey, recordIndex, columns) => {
    return {
      prepends: [],
      row: (
        <div 
          key={rowKey}
          className={classNames(
            `${classPrefix}-table__tr`,
            isFunction(rowDisabled)
              ? { "is-disabled": rowDisabled(record) }
              : ""
          )}
        >
          {columns.map((column, index) => {
            const cKey = column.key;
            const { props, children } = renderColumn(
              record,
              rowKey,
              recordIndex,
              column,
              index
            );
            if (props.colSpan === 0 || props.rowSpan === 0) {
              return null;
            }
            const cell = (
              <div 
                className={classNames(
                  `${classPrefix}-table__td`,
                  `${classPrefix}-text--${column.align || "left"}`
                )}
                key={cKey}
              >
                {children}
              </div>
            );

            return cell;
          })}
        </div>
      ),
      appends: [],
    };
  });

  // 记录渲染：(record) => <tr>[]
  const renderRecord = (record: any, recordIndex: number) => {
    // 生成 rowKey
    const rowKey = getRowKey(record, recordIndex);
    const { prepends, row, appends } = renderRow(
      record,
      rowKey,
      recordIndex,
      columns
    );
    return [...prepends, row, ...appends].filter(Boolean);
  };

  const renderBody = useMiddleware(
    addons,
    "onInjectBody"
  )(records => (
    <div className={`${classPrefix}-table__body`} ref={ref}>
      {(records || []).map((record, index) => (
        <Fragment key={getRowKey(record, index)}>
          {renderRecord(record, index)}
        </Fragment>
      ))}
    </div>
  ));

  return renderBody(records, null, null, null);
});

TableBody.displayName = "TableBody";

function isFunction(target: any) {
  return typeof target === "function";
}
