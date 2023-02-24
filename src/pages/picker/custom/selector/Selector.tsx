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
import { SelectorProps } from "../../CustomPickerProps";
import { noop } from "../../../_util/noop";
import { TaroEnv } from "../../../_util/env";
import { useTranslation } from "../../../config-provider/i18n";
import { useConfig } from "../../../_util/use-config";

const PickerView = TaroEnv === "weapp" ? TaroPickerView : CorePickerView;
const PickerViewColumn =
  TaroEnv === "weapp" ? TaroPickerViewColumn : CorePickerViewColumn;

export function Selector(props: SelectorProps) {
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
  const [innerValue, setInnerValue] = useState(value || 0);
  const [confirmDisabled, setConfirmDisabled] = useState(false);

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const data: React.ReactNode[] = rangeKey
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
                  setInnerValue(value || 0);
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
                value={[innerValue]}
                onChange={event => {
                  setInnerValue(event.detail.value[0]);
                }}
                onPickStart={() => setConfirmDisabled(true)}
                onPickEnd={() => setConfirmDisabled(false)}
                indicatorStyle={indicatorStyle}
                indicatorClass={indicatorClassName}
                // maskClassName=""
                // maskStyle=""
              >
                <PickerViewColumn className={`${classPrefix}-picker__item`}>
                  {data.map((item, index) => (
                    <div 
                      className={`${classPrefix}-picker__item-inner`}
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </PickerViewColumn>
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
