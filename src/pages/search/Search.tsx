import React, { forwardRef } from "react";
import classNames from "classnames";
import { ITouchEvent, View, Text } from "@tarojs/components";
import { Icon } from "../icon";
import { Input, InputProps } from "../input";
import { useDefaultValue } from "../_util/use-default";
import { noop } from "../_util/noop";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";
import { TaroEnv } from "../_util/env";

export interface SearchProps
  extends Omit<
    InputProps,
    "name" | "type" | "confirmType" | "onInput" | "onConfirm"
  > {
  /**
   * 不显示搜索图标
   * @default false
   */
  hideIcon?: boolean;

  /**
   * 显示取消按钮
   * @default false
   */
  showCancel?: boolean;

  /**
   * 搜索回调函数
   */
  onSearch?: (value: string) => void;

  /**
   * 清空回调函数
   */
  onClear?: () => void;

  /**
   * 取消回调函数
   */
  onCancel?: () => void;
}

export const Search = forwardRef(function Search(
  props: SearchProps,
  ref: React.Ref<any>
) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  const {
    value,
    placeholder = "请输入",
    disabled,
    showCancel,
    hideIcon,
    className,
    onChange,
    onSearch = noop,
    onClear = noop,
    onCancel = noop,
    ...restProps
  } = useDefaultValue(props);

  const handleConfirm = (e: ITouchEvent): void => {
    e.stopPropagation();
    onSearch(value);
  };

  const handleReset = (event: ITouchEvent): void => {
    event.stopPropagation();
    onChange("", { event });
    onClear();
  };

  const handleCancel = (event: ITouchEvent): void => {
    event.stopPropagation();
    onChange("", { event });
    onCancel();
  };

  return (
    <div 
      className={classNames(`${classPrefix}-search`, className, {
        "is-disabled": disabled,
      })}
    >
      {!hideIcon && (
        <Icon name="search" className="icon-search" onClick={handleConfirm} />
      )}
      <Input
        ref={ref}
        className={`${classPrefix}-search__input`}
        placeholder={placeholder}
        value={value}
        confirmType="search"
        disabled={disabled}
        onChange={onChange}
        onConfirm={handleConfirm}
        {...restProps}
      />
      {!!value && (
        <Icon
          name="close-fill"
          className={`${classPrefix}-search__reset`}
          size={TaroEnv ? 40 : 20}
          onClick={handleReset}
        />
      )}
      {showCancel && (
        <Text
          className={`${classPrefix}-search__cancel`}
          onClick={handleCancel}
        >
          {t.cancelText}
        </label>
      )}
    </div>
  );
});
