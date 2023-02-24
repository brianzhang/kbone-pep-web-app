import { TableProps } from "../TableProps";
import { getValueByPathKey } from "./get-value-by-path-key";

export function getRowKeyFromRecordKey(recordKey: TableProps["recordKey"]) {
  let getRowKey: Exclude<typeof recordKey, string> = null;
  if (typeof recordKey === "function") {
    getRowKey = recordKey;
  } else if (typeof recordKey === "string") {
    getRowKey = record => {
      const value = getValueByPathKey(record, recordKey);
      return typeof value === "undefined" || value === null
        ? ""
        : String(value);
    };
  } else {
    // 如果未提供 rowKey，使用索引生成
    // TODO: 输出告警
    getRowKey = (_, recordIndex) => `record_${recordIndex}`;
  }
  return getRowKey;
}
