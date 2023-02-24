import React, { useEffect, useState } from "react";
import classNames from "classnames";
import EventEmitter from "eventemitter3";
import { View, Button, Text } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import { Popup, PopupProps } from "../popup";
import { callBoth } from "../_util/call-both";
import { StyledProps } from "../_type";
import { noop } from "../_util/noop";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";

export interface ActionSheetOption extends StyledProps {
  /**
   * 选项名称
   */
  name?: React.ReactNode;

  /**
   * 选项说明
   */
  description?: React.ReactNode;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否为破坏性选项
   * @default false
   */
  destructive?: boolean;

  /**
   * 微信开放能力
   */
  openType?: ButtonProps["openType"];
}

export interface ActionSheetShowOptions extends StyledProps {
  /**
   * 面板标题
   */
  title?: React.ReactNode;

  /**
   * 面板选项
   */
  options?: (string | ActionSheetOption)[];

  /**
   * 选中回调
   */
  onSelect?: (index: number) => void;

  /**
   * 关闭回调
   */
  onClose?: () => void;
}

export interface ActionSheetProps
  extends Pick<PopupProps, "visible" | "onVisibleChange">,
    ActionSheetShowOptions {}

export function ActionSheet({
  visible,
  onVisibleChange = noop,
  onSelect = noop,
  onClose = noop,
  title,
  options = [],
  className,
}: ActionSheetProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  return (
    <Popup
      visible={visible}
      onVisibleChange={onVisibleChange}
      onClose={onClose}
      overlay={
        <div className={classNames(`${classPrefix}-actionsheet`, className)}>
          {title && (
            <div className={`${classPrefix}-actionsheet__title`}>{title}</div>
          )}
          <div className={`${classPrefix}-actionsheet__actions`}>
            {options.map((option, index) => {
              const {
                name,
                description,
                destructive,
                disabled,
                openType,
                className,
                style,
              }: ActionSheetOption =
                typeof option === "string" ? { name: option } : option;

              return (
                <Button
                  key={index}
                  className={classNames(
                    `${classPrefix}-actionsheet__item`,
                    className,
                    {
                      "is-disabled": disabled,
                      "is-destructive": destructive,
                    }
                  )}
                  hoverClass={`${classPrefix}-actionsheet__item--hover`}
                  style={style}
                  disabled={disabled}
                  openType={openType}
                  onClick={() => {
                    onSelect(index);
                    onClose();
                    onVisibleChange(false);
                  }}
                >
                  <label className={`${classPrefix}-actionsheet__name`}>
                    {name}
                  </label>
                  {description && (
                    <label className={`${classPrefix}-actionsheet__description`}>
                      {description}
                    </label>
                  )}
                </Button>
              );
            })}
          </div>
          <div className={`${classPrefix}-actionsheet__cancel`}>
            <Button
              className={`${classPrefix}-actionsheet__cancel-button`}
              hoverClass={`${classPrefix}-actionsheet__cancel-button--hover`}
              onClick={() => {
                onClose();
                onVisibleChange(false);
              }}
            >
              {t.cancelText}
            </Button>
          </div>
        </div>
      }
    />
  );
}

interface ActionSheetEventTypes {
  show: [ActionSheetShowOptions];
  hide: [];
}

class ActionSheetEmitter extends EventEmitter<ActionSheetEventTypes> {}

export const actionSheetEmitter = new ActionSheetEmitter();

export function ActionSheetManager(props: ActionSheetShowOptions) {
  const [options, setOptions] = useState<
    ActionSheetShowOptions & { visible?: boolean }
  >(props);

  useEffect(() => {
    const onShow = ({ ...options }) => {
      setOptions({ ...options, visible: true });
    };
    const onHide = () => {
      setOptions(options => ({ ...options, visible: false }));
    };

    actionSheetEmitter.on("show", onShow);
    actionSheetEmitter.on("hide", onHide);
    return () => {
      actionSheetEmitter.removeListener("show", onShow);
      actionSheetEmitter.removeListener("hide", onHide);
    };
  }, []);

  return (
    <ActionSheet
      {...options}
      onClose={callBoth(options.onClose, () => actionSheetEmitter.emit("hide"))}
    />
  );
}

ActionSheet.show = function show(options: ActionSheetShowOptions) {
  actionSheetEmitter.emit("show", options);
};
