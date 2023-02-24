import React from "react";
import { StyledProps } from "../_type";

export interface TableColumn<Record = any> {
  /**
   * 列标识
   *
   * - 支持支持路径嵌套，如 `"info.name"`
   */
  key: string;

  /**
   * 表头
   * @docType React.ReactNode | ((column: TableColumn<Record>) => React.ReactNode)
   */
  header: React.ReactNode | ((column: TableColumn<Record>) => React.ReactNode);

  /**
   * 数据渲染方法
   * 如果不提供渲染方法，会尝试查找数据中 `key` 属性所指向的字段
   *
   * @param record 对应的数据记录
   * @param context.rowKey 当前渲染行的 `key` 值
   * @param context.recordIndex 数据记录在记录集中的索引
   * @param context.column 正在渲染的列
   * @param context.columnIndex 列索引
   */
  render?: (
    record: Record,
    context: {
      rowKey: string;
      recordIndex: number;
      column: TableColumn<Record>;
      columnIndex: number;
    }
  ) => React.ReactNode;

  /**
   * 列宽度，可以指定 CSS 属性或数字
   */
  width?: string | number;

  /**
   * 对齐规则，左中右
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface TableProps<Record = any> extends StyledProps {
  /**
   * 表格布局
   *
   * @default "auto"
   */
  layout?: "auto" | "fixed";

  /**
   * 表格的列配置，必须提供
   */
  columns: TableColumn<Record>[];

  /**
   * 表格的数据，可以是任意类型
   */
  records?: Record[];

  /**
   * 表格行 `key` 的取值，提供作为的 `key` 数据字段名，或者提供获取 `key` 的回调。注意：
   *
   *  - 不同数据不要提供重复的 `key` 值，否则会发生渲染与数据不一致
   *  - 如果不提供 `recordKey`，默认将会用索引位置生成 `key`，在数据变化等场景下，仍可能会发生渲染不一致问题
   *  - 支持支持路径嵌套，如 `"info.name"`
   *
   * **😎 建议总是提供你的 `recordKey`**
   *
   */
  recordKey?:
    | (Record extends { [key: string]: any } ? keyof Record : string)
    | ((record: Record, recordIndex: number) => string);

  /**
   * 如何判定给定的记录是否禁用（禁用的记录将不可选）
   * */
  rowDisabled?: (record: Record) => boolean;

  /**
   * 表格宽度
   *
   * *超出容器宽度将产生横向滚动*
   */
  width?: number | string;

  // /**
  //  * 是否隐藏表头
  //  * @default false
  //  */
  // hideHeader?: boolean;

  // /**
  //  * 表格顶部显示的内容
  //  *
  //  * *可以用于显示 loading、数据为空等*
  //  */
  // top?: React.ReactNode;

  // /**
  //  * 表格底部显示的内容
  //  */
  // bottom?: React.ReactNode;

  // /**
  //  * 是否带边框
  //  * @default false
  //  */
  // bordered?: false | "all";

  /**
   * 使用的表格插件列表
   */
  addons?: TableAddon[];
}

/**
 * table 插件
 */
export interface TableAddon<Record = any> {
  /**
   * 获取插件信息
   * @since 2.7.0
   */
  getInfo?: TableMiddleware<{ name: string }>;

  /**
   * 在表格渲染前，可以返回更改的 props
   */
  onInjectProps?: TableMiddleware<TableProps<Record>>;

  /**
   * 对于每一行 (`<tr>`) 的渲染结果，返回变更的结果。
   * 变更的结果可以在原结果前后插入新行
   */
  onInjectRow?: TableMiddleware<TableRowRender<Record>>;

  /**
   * 对于每一列的渲染结果，返回变更的结果
   */
  onInjectColumn?: TableMiddleware<TableColumnRender<Record>>;

  /**
   * 变更 `<tbody>` 的渲染结果
   */
  onInjectBody?: TableMiddleware<TableBodyRender<Record>>;

  /**
   * 变更 `<thead>` 的渲染结果
   */
  onInjectHead?: TableMiddleware<(props: TableProps<Record>) => JSX.Element>;

  /**
   * 变更 `<table>` 的渲染结果
   */
  onInjectTable?: TableMiddleware<(props: TableProps<Record>) => JSX.Element>;
}

export interface TableMiddleware<T> {
  (next: T): T;
}

export interface TableBodyRender<Record = any> {
  (
    records: Record[],
    columns: TableColumn<Record>[],
    topTip: React.ReactNode,
    bottomTip: React.ReactNode
  ): JSX.Element;
}

export interface TableRowRender<Record = any> {
  (
    record: Record,
    rowKey: string,
    recordIndex: number,
    columns: TableColumn<Record>[]
  ): TableRowRenderResult;
}

export interface TableRowRenderResult {
  // should return <tr /> in array
  prepends: JSX.Element[];
  // should return <tr />
  row: JSX.Element;
  // shoud return <tr /> in array
  appends: JSX.Element[];
}

export interface TableColumnRender<Record = any> {
  (
    record: Record,
    rowKey: string,
    recordIndex: number,
    column: TableColumn<Record>,
    /**
     * @2.0.10 新增
     */
    columnIndex?: number
  ): TableColumnRenderResult;
}

export interface TableColumnRenderResult {
  props: React.TdHTMLAttributes<HTMLTableDataCellElement>;
  children: React.ReactNode;
}

export interface RowRenderContext<Record = any> {
  /**
   * 原内容
   */
  children: React.ReactNode;

  /**
   * 当前行记录
   */
  record: Record;

  /**
   * 当前行 Key
   */
  rowKey: string;

  /**
   * 当前行序号
   */
  recordIndex: number;

  /**
   * 当前行是否被禁用
   */
  disabled?: boolean;

  /**
   * 当前行深度
   */
  depth?: number;
}
