import React, { ReactNode } from "react";
import { CommonEvent } from "@tarojs/components/types/common";
import classNames from "classnames";
import { Text, View } from "@tarojs/components";
import { ControlledProps, ChangeContext, StyledProps } from "../../_type";
import { TableAddon } from "../TableProps";
import { useConfig } from "../../_util/use-config";
import { getValueByPathKey } from "../util/get-value-by-path-key";

/**
 * `sortable` 插件用于支持表格的排序操作。
 */
export interface SortableOptions<Record = any>
  extends ControlledProps<
    SortBy[],
    CommonEvent,
    SortableChangeContext<Record>
  > {
  /**
   * 不支持非受控模式
   */
  defaultValue?: never;

  /**
   * 指定哪些列支持排序，可传入键值，或者详细配置
   */
  columns: (string | SortableColumn<Record>)[];
}

/**
 * 比较函数
 */
type CompareFunction<Record = any> = (first: Record, second: Record) => number;

export interface SortableColumn<Record = any> {
  /**
   * 要支持排序的列的键值
   */
  key: string;

  /**
   * 当列从未排序进入排序状态时，优先使用的排序状态
   */
  prefer: SortOrder;

  /**
   * 自定义排序函数
   * @since 2.6.0
   */
  sorter?: CompareFunction<Record>;
}

export interface SortableChangeContext<Record = any> extends ChangeContext {
  /**
   * 当前引起变更的排序信息
   */
  sort: SortBy<Record>;
}

export type SortOrder = "asc" | "desc" | undefined;

export interface SortBy<Record = any> {
  /**
   * 按照哪一列排序
   */
  by: string;

  /**
   * 升序/倒序/未排序
   */
  order: SortOrder;

  /**
   * 自定义排序函数
   * @since 2.6.0
   */
  sorter?: CompareFunction<Record>;
}

export function sortable(options: SortableOptions): TableAddon {
  // 当前列的排序优先级
  const sortablePrefer = new Map<string, SortOrder>(
    (options.columns || []).map(column =>
      typeof column === "string"
        ? ([column, "asc"] as [string, SortOrder])
        : ([column.key, column.prefer] as [string, SortOrder])
    )
  );
  // 当前列的自定义排序函数
  const sortableCompare = new Map<string, CompareFunction>(
    (options.columns || []).map(column =>
      typeof column === "string"
        ? ([column, undefined] as [string, CompareFunction])
        : ([column.key, column.sorter] as [string, CompareFunction])
    )
  );
  // 当前列的排序状态
  const sortMap = new Map<string, SortOrder>(
    (options.value || []).map(
      sort => [sort.by, sort.order] as [string, SortOrder]
    )
  );

  return {
    getInfo: () => ({ name: "sortable" }),
    onInjectColumn: renderColumn => (
      record,
      rowKey,
      recordIndex,
      column,
      columnIndex
    ) => {
      const columnResult = renderColumn(
        record,
        rowKey,
        recordIndex,
        column,
        columnIndex
      );

      // recordIndex > -1 是记录行，我们只注入表头
      if (recordIndex > -1) {
        return columnResult;
      }

      // 不是可排序列，跳过
      if (!sortablePrefer.has(column.key)) {
        return columnResult;
      }

      // 获取原始渲染内容
      let { children } = columnResult;

      // 当前的排序状态 undefined | "asc" | "desc"
      const order = sortMap.get(column.key);

      // 当前列的自定义排序函数
      const sorter = sortableCompare.get(column.key);

      // 切换排序状态
      const changeOrder = (event: CommonEvent) => {
        if (typeof options.onChange !== "function") {
          return;
        }
        let nextOrder: SortOrder;
        const prefer = sortablePrefer.get(column.key);
        if (!order) {
          nextOrder = prefer;
        }
        if (order === "asc") {
          nextOrder = prefer === "asc" ? "desc" : undefined;
        }
        if (order === "desc") {
          nextOrder = prefer === "asc" ? undefined : "asc";
        }
        const sort: SortBy = {
          by: column.key,
          order: nextOrder,
          sorter,
        };
        // 删除旧排序规则，保证新的在前
        sortMap.delete(column.key);
        const value: SortBy[] = (nextOrder ? [sort] : []).concat(
          Array.from(sortMap).map(([by, order]) => ({ by, order }))
        );
        options.onChange(value, { event, sort });
      };

      // 包装一个排序按钮
      children = (
        <SortButton order={order} onClick={changeOrder}>
          {children}
        </SortButton>
      );
      return { ...columnResult, children };
    },
  };
}

export interface SortButtonProps extends StyledProps {
  children?: ReactNode;
  order?: SortOrder;
  onClick?: (evt: CommonEvent) => void;
}

export function SortButton({
  order,
  className,
  style,
  children,
  onClick,
}: SortButtonProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(
        `${classPrefix}-table__sortbtn`,
        { "is-active": Boolean(order) },
        className
      )}
      style={style}
      onClick={onClick}
    >
      <label className={`${classPrefix}-table__headerop`}>{children}</label>
      <div 
        className={classNames(
          `${classPrefix}-table__sortbtn-triangle`,
          order && `${classPrefix}-table__sortbtn-triangle--${order}`
        )}
      />
    </div>
  );
}

function comparer(sorts: SortBy[]) {
  return (a: any, b: any) => {
    for (const { by, order, sorter } of sorts) {
      const hasSorter = typeof sorter === "function";
      const firstValue = getValueByPathKey(a, by);
      const secondValue = getValueByPathKey(b, by);
      const isAsc = hasSorter ? sorter(a, b) < 0 : firstValue < secondValue;
      const isDesc = hasSorter ? sorter(a, b) > 0 : firstValue > secondValue;
      if (isAsc || isDesc) {
        if (order === "asc") return isAsc ? -1 : 1;
        if (order === "desc") return isDesc ? -1 : 1;
      }
    }
    return 0;
  };
}

sortable.comparer = comparer as (sorts: SortBy[]) => (a: any, b: any) => number;
