import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {
  View,
  PickerView as TaroPickerView,
  PickerViewColumn as TaroPickerViewColumn,
} from "@tarojs/components";
import {
  PickerView as CorePickerView,
  PickerViewColumn as CorePickerViewColumn,
} from "../../../_core/components/picker";
import { useDefaultValue } from "../../../_util/use-default";
import { Popup } from "../../../popup";
import { MultiSelectorProps } from "../../CustomPickerProps";
import { noop } from "../../../_util/noop";
import { TaroEnv } from "../../../_util/env";
import { useTranslation } from "../../../config-provider/i18n";
import { useConfig } from "../../../_util/use-config";

const PickerView = TaroEnv === "weapp" ? TaroPickerView : CorePickerView;
const PickerViewColumn =
  TaroEnv === "weapp" ? TaroPickerViewColumn : CorePickerViewColumn;

function fillValue(value: number[], length: number) {
  if (Array.isArray(value)) {
    return [...value, ...new Array(length).fill(0)].slice(0, length);
  }
  return new Array(length).fill(0);
}

export function MultiSelector(props: MultiSelectorProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  const {
    header,
    footer,
    disabled,
    range = [],
    rangeKey,
    value,
    onChange,
    children,
    className,
    style,
    indicatorClassName,
    indicatorStyle,
    onCancel = noop,
  } = useDefaultValue(props);
  const [innerValue, setInnerValue] = useState(fillValue(value, range.length));
  const [confirmDisabled, setConfirmDisabled] = useState(false);

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(fillValue(value, range.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const data: React.ReactNode[][] = rangeKey
    ? range.map(i => i[rangeKey])
    : range;

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
          style={style}
        >
          <div className={`${classPrefix}-picker-inner`}>
            <div className={`${classPrefix}-picker__header`}>
              <div 
                className={`${classPrefix}-picker__cancel`}
                onClick={event => {
                  setInnerValue(fillValue(value, range.length));
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
                  onChange(innerValue, { event });
                  close();
                }}
              >
                {t.confirmText}
              </div>
            </div>
            <div className={`${classPrefix}-picker__body`}>
              <PickerView
                className={`${classPrefix}-picker__body-inner`}
                value={innerValue}
                onChange={event => {
                  setInnerValue(event.detail.value);
                }}
                onPickStart={() => setConfirmDisabled(true)}
                onPickEnd={() => setConfirmDisabled(false)}
                indicatorStyle={indicatorStyle}
                indicatorClass={indicatorClassName}
                // maskClassName=""
                // maskStyle=""
              >
                {data.map((column, index) => (
                  <PickerViewColumn
                    className={`${classPrefix}-picker__item`}
                    key={index}
                  >
                    {column.map((item, index) => (
                      <div 
                        className={`${classPrefix}-picker__item-inner`}
                        key={index}
                      >
                        {item}
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
