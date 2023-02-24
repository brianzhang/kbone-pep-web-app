import React, { useRef } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { pxTransform } from "../_util/px-transform";
import { TableProps } from "./TableProps";
import { TableColGroup } from "./TableColGroup";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { getRowKeyFromRecordKey } from "./util/get-row-key-from-record-key";
import { getValueByPathKey } from "./util/get-value-by-path-key";
import { useConfig } from "../_util/use-config";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";
import { useMiddleware } from "./util/use-middleware";
import * as addons from "./addons";

export const Table = forwardRefWithStatics(
  function Table<Record>(props: TableProps<Record>, ref: React.Ref<div Props>) {
    const { layout = "auto", columns, width, addons = [] } = props;
    const { classPrefix } = useConfig();
    const headRef = useRef<div Props>(null);
    const bodyRef = useRef<div Props>(null);

    // eslint-disable-next-line no-param-reassign
    props = useMiddleware(addons, "onInjectProps")(props);
    const renderTable = useMiddleware(
      addons,
      "onInjectTable"
    )(({ className, style, ...props }) => (
      <div 
        className={classNames(`${classPrefix}-table__container`, className, {
          [`${classPrefix}-table__container--bordered`]: false,
        })}
        style={style}
        ref={ref}
        {...props}
      >
        <div 
          className={classNames(`${classPrefix}-table`, {
            [`${classPrefix}-table--fixed`]: layout === "fixed",
          })}
          style={{
            width: typeof width === "number" ? pxTransform(width, 750) : width,
          }}
        >
          <TableColGroup columns={props.columns} />

          <TableHead ref={headRef} {...props} />

          <TableBody ref={bodyRef} {...props} />
        </div>
      </div>
    ));

    return renderTable(props);
  },
  {
    addons,
  }
) as (<Record>(
  props: TableProps<Record> & { ref?: React.Ref<div Props> }
) => React.ReactElement) & {
  addons: typeof addons;
  displayName: string;
};

Table.displayName = "Table";
