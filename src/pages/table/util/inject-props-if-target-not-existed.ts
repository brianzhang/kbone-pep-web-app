export function injectPropsIfTargetNotExisted(
  columns,
  targetColumnKey,
  columnProps = {} as any,
  postposition = false
) {
  // 查找注入的目标列
  let targetColumnIndex = -1;
  if (targetColumnKey) {
    targetColumnIndex = columns.findIndex(x => x.key === targetColumnKey);
    if (targetColumnIndex === -1) {
      console.warn(
        `Table addon can not find column "${targetColumnKey}", did you rename or misspell it?`
      );
    }
  }
  // 没有目标列，创建一个列
  if (+targetColumnIndex === -1) {
    columnProps.ignore = true;
    return postposition ? [...columns, columnProps] : [columnProps, ...columns];
  }
  return columns;
}
