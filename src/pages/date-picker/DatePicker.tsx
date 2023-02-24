import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  View,
  PickerView as TaroPickerView,
  PickerViewColumn as TaroPickerViewColumn,
  CommonEventFunction,
} from "@tarojs/components";
import {
  PickerView as CorePickerView,
  PickerViewColumn as CorePickerViewColumn,
} from "../_core/components/picker";
import { useDefaultValue } from "../_util/use-default";
import { Popup } from "../popup";
import { ControlledProps } from "../_type/ControlledProps";
import {
  dataToString,
  DateTimeData,
  dataToIndexes,
  getFieldRanges,
  indexesToData,
  stringToData,
  adjustData,
  fieldsOrder,
  fieldUnitLocaleKeyMap,
} from "./util";
import { CommonProps } from "../_type";
import { noop } from "../_util/noop";
import { TaroEnv } from "../_util/env";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";

dayjs.extend(customParseFormat);

const PickerView = TaroEnv === "weapp" ? TaroPickerView : CorePickerView;
const PickerViewColumn =
  TaroEnv === "weapp" ? TaroPickerViewColumn : CorePickerViewColumn;

export interface DatePickerProps extends ControlledProps<string>, CommonProps {
  /**
   * 表示有效日期范围的开始
   * @default "1970-01-01 00:00"
   */
  start?: string;

  /**
   * 表示有效日期范围的结束
   * @default "2099-12-31 23:59"
   */
  end?: string;

  /**
   * 选择器类型
   * @default "date"
   */
  mode?: "year" | "month" | "date" | "time" | "datetime";

  /**
   * 自定义选择器值格式
   *
   * *默认根据 `mode` 取 `"YYYY-MM-DD HH:mm:ss"` 的一部分*
   */
  format?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 选择器顶部区域内容
   */
  header?: React.ReactNode;

  /**
   * 选择器底部区域内容
   */
  footer?: React.ReactNode;

  /**
   * 选择器中间选中框的类名
   */
  indicatorClassName?: string;

  /**
   * 选择器中间选中框的样式
   */
  indicatorStyle?: string;

  /**
   * 取消选择或点遮罩层收起时触发
   */
  onCancel?: CommonEventFunction;

  /**
   * 时间选择步长
   */
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
}

const defaultFormatMap = {
  year: "YYYY",
  month: "YYYY-MM",
  day: "YYYY-MM-DD",
  date: "YYYY-MM-DD",
  time: "HH:mm",
  datetime: "YYYY-MM-DD HH:mm",
};

export function DatePicker(props: DatePickerProps) {
  const { classPrefix } = useConfig();
  const t = useTranslation();
  const {
    header,
    footer,
    disabled,
    value,
    onChange,
    children,
    className,
    style = {},
    indicatorClassName,
    indicatorStyle,
    start,
    end,
    mode = "date",
    format = defaultFormatMap[mode] || defaultFormatMap.date,
    onCancel = noop,
    step = {},
  } = useDefaultValue(props);

  useEffect(() => {
    if (value && !dayjs(value, format, true).isValid()) {
      throw new Error(`\`value\`[${format}](${value}) is not valid`);
    }
    if (start && !dayjs(start, format, true).isValid()) {
      throw new Error(`\`start\`[${format}](${start}) is not valid`);
    }
    if (end && !dayjs(end, format, true).isValid()) {
      throw new Error(`\`end\`[${format}](${end}) is not valid`);
    }
  }, [value, format, start, end]);

  const [innerValue, setInnerValue] = useState<DateTimeData>(
    stringToData(value || end || start, format, step)
  );

  const [confirmDisabled, setConfirmDisabled] = useState(false);

  useEffect(() => {
    if (value !== dataToString(innerValue, format)) {
      setInnerValue(stringToData(value || end || start, format, step));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const ranges = useMemo(() => getFieldRanges(innerValue, format, start, end), [
    innerValue,
    format,
    start,
    end,
  ]);

  if (disabled) {
    return <div>{children}</div>;
  }

  return (
    <Popup
      onClose={({ source, event }) => {
        if (source === "mask") {
          onCancel(event);
        }
      }}
      onVisibleChange={visible => {
        if (visible) {
          setConfirmDisabled(false);
        }
      }}
      overlay={close => (
        <div 
          className={classNames(`${classPrefix}-picker`, className)}
          // 兼容旧的样式
          style={{ ...style, display: "block" }}
        >
          <div className={`${classPrefix}-picker-inner`}>
            <div className={`${classPrefix}-picker__header`}>
              <div 
                className={`${classPrefix}-picker__cancel`}
                onClick={event => {
                  setInnerValue(
                    stringToData(value || end || start, format, step)
                  );
                  onCancel(event);
                  close();
                }}
              >
                {t.cancelText}
              </div>
              <div className={`${classPrefix}-picker__title`}>{header}</div>
              <div 
                className={classNames(`${classPrefix}-picker__confirm`, {
                  "is-disabled": confirmDisabled,
                })}
                onClick={event => {
                  if (confirmDisabled) {
                    return;
                  }
                  onChange(dataToString(innerValue, format), { event });
                  close();
                }}
              >
                {t.confirmText}
              </div>
            </div>
            <div className={`${classPrefix}-picker__body`}>
              <PickerView
                className={`${classPrefix}-picker__body-inner`}
                value={dataToIndexes(innerValue, ranges, step)}
                onChange={event => {
                  // 使用滚动前的 ranges 生成 data，该 data 可能处于不合法日期范围
                  const data = indexesToData(event.detail.value, ranges, step);
                  setInnerValue(adjustData(data, format, start, end));
                }}
                onPickStart={() => setConfirmDisabled(true)}
                onPickEnd={() => setConfirmDisabled(false)}
                indicatorStyle={indicatorStyle}
                indicatorClass={indicatorClassName}
                // maskClassName=""
                // maskStyle=""
              >
                {fieldsOrder
                  .filter(field => ranges[field])
                  .map(field => (
                    <PickerViewColumn
                      className={`${classPrefix}-picker__item`}
                      key={field}
                    >
                      {Array(ranges[field][1] - ranges[field][0] + 1)
                        .fill(null)
                        .filter(
                          (_, index) => index % (step?.[field] || 1) === 0
                        )
                        .map((_, index) => (
                          <div 
                            className={`${classPrefix}-picker__item-inner`}
                            key={`${ranges[field][0]}-${ranges[field][1]}-${index}`}
                          >
                            {ranges[field][0] -
                              (ranges[field][0] % (step?.[field] || 1)) +
                              index * (step?.[field] || 1)}{" "}
                            {t[fieldUnitLocaleKeyMap[field]]}
                          </div>
                        ))}
                    </PickerViewColumn>
                  ))}
              </PickerView>
            </div>
            {footer}
          </div>
        </div>
      )}
    >
      {children}
    </Popup>
  );
}
