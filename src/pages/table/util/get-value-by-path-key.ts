/**
 * 获取路径模式 Key 对应数据
 * @param record
 * @param pathKey
 */
export function getValueByPathKey<Record = any>(
  record: Record,
  pathKey: string
) {
  if (typeof pathKey !== "string") {
    return undefined;
  }
  // 兼容包含点的 key
  if (typeof record[pathKey] !== "undefined") {
    return record[pathKey];
  }

  const path = pathKey.split(".");
  let value = record[path.shift()];
  while (typeof value === "object" && value !== null && path.length > 0) {
    value = value[path.shift()];
  }

  return value;
}
