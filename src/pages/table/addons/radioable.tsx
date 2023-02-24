import React, { forwardRef } from "react";
import classNames from "classnames";
import { CommonEvent, ITouchEvent } from "@tarojs/components/types/common";
import { ViewProps } from "@tarojs/components/types/View";
import { TableAddon, RowRenderContext } from "../TableProps";
import { ControlledProps } from "../../_type";
import { Radio } from "../../radio";
import { injectPropsIfTargetNotExisted } from "../util/inject-props-if-target-not-existed";
import { useConfig } from "../../_util/use-config";

/**
 * `radioable` 插件用于支持表格可单选行的样式及操作。
 */
export interface RadioableOptions<Record = any>
  extends ControlledProps<
    string,
    CommonEvent,
    { event: CommonEvent; record: Record }
  > {
  /**
   * 不支持非受控模式
   */
  defaultValue?: never;

  /**
   * 提供一个列的 `key`，将选择组件插入到一个目标列
   *
   * 默认在最前新建一列插入
   */
  targetColumnKey?: string;

  /**
   * 是否整行可选
   * @default false
   */
  rowSelect?: boolean;

  /**
   * 列宽度，可以指定 CSS 属性或数字 (单位：px)
   * @default 52
   */
  width?: string | number;

  /**
   * **高级用法**
   * 更改该插件的在每行的渲染内容，`element` 为默认渲染内容，`context` 中包含该行数据相关信息
   * @default x => x
   */
  render?: (
    element: JSX.Element,
    context: RowRenderContext<Record>
  ) => React.ReactNode;
}

const fallbackColumnKey = "__radioable_addon__";

// let rowDisabled: TableProps["rowDisabled"] = null;

const SelectWrapper = forwardRef(function SelectWrapper(
  {
    value,
    onChange,
    name,
    rowSelect,
    children,
    ...props
  }: {
    name: string;
    rowSelect: boolean;
    value: string;
    onChange: (name: string, context: { event: CommonEvent }) => void;
    children: React.ReactElement<div Props>;
  } & Omit<div Props, "onChange">,
  ref
): JSX.Element {
  const rowSelectProps = {
    onClick: (event: ITouchEvent) => {
      // 事件合并
      if (typeof props.onClick === "function") {
        props.onClick(event);
      }
      if (typeof children.props.onClick === "function") {
        children.props.onClick(event);
      }

      return onChange(name, { event });
    },
  };

  return React.cloneElement(children, {
    ...props,
    ref,
    className: classNames(props.className, children.props.className, {
      "is-selected": value === name,
    }),
    ...(rowSelect ? rowSelectProps : {}),
  });
});

export function radioable({
  value,
  onChange,
  targetColumnKey,
  rowSelect,
  width = 52,
  render = x => x,
}: RadioableOptions): TableAddon {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { classPrefix } = useConfig();

  return {
    getInfo: () => ({ name: "radioable" }),
    onInjectProps: props => {
      // rowDisabled = props.rowDisabled || (() => false);

      const columns = injectPropsIfTargetNotExisted(
        props.columns,
        targetColumnKey,
        {
          key: fallbackColumnKey,
          width,
          header: null,
          render: () => null,
        }
      );

      return { ...props, columns };
    },
    onInjectColumn: previous => (
      record,
      rowKey,
      recordIndex,
      column,
      columnIndex
    ) => {
      // 不是目标列
      if (column.key !== targetColumnKey && column.key !== fallbackColumnKey) {
        return previous(record, rowKey, recordIndex, column, columnIndex);
      }

      const { children: preChildren, props, ...result } = previous(
        record,
        rowKey,
        recordIndex,
        column,
        columnIndex
      );

      let children = preChildren;

      // 非表头
      if (recordIndex !== -1) {
        const element = (
          <Radio
            checked={value === rowKey}
            onChange={(_, { event }) => onChange(rowKey, { event, record })}
            className={`${classPrefix}-table__radio`}
          >
            {children || <div>&nbsp;</div>}
          </Radio>
        );
        children = render(element, {
          children: preChildren,
          record,
          rowKey,
          recordIndex,
        });
      }
      return { ...result, props, children };
    },
    onInjectRow: renderRow => (record, rowKey, recordIndex, columns) => {
      const { prepends, appends, row: preRow } = renderRow(
        record,
        rowKey,
        recordIndex,
        columns
      );
      let row = preRow;
      // 支持整行选择
      row = (
        <SelectWrapper
          key={rowKey}
          name={rowKey}
          value={value}
          onChange={(value, context) => onChange(value, { ...context, record })}
          rowSelect={rowSelect}
        >
          {row}
        </SelectWrapper>
      );
      return { prepends, row, appends };
    },
  };
}
