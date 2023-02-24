import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import {
  View,
  ITouchEvent,
  FormItemProps,
  Text,
  ScrollView,
} from "@tarojs/components";
import { getRect } from "../_util/get-rect";
import { ControlledProps, StyledProps } from "../_type";
import { Icon } from "../icon";
import { Checkbox } from "../checkbox";
import { List } from "../list";
import { Button } from "../button";
import { noop } from "../_util/noop";
import { useDefaultValue } from "../_util/use-default";
import { uuid } from "../_util/uuid";
import { injectValue } from "../_util/inject-value";
import { useCatchMove } from "../_util/use-catch-move";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";
import { Popper } from "../popper";

export type SelectProps = SelectSingleProps | SelectMultipleProps;

export interface SelectBaseProps extends StyledProps, FormItemProps {
  /**
   * 选项
   */
  options: SelectOption[];

  /**
   * 是否加载中
   */
  loading?: boolean;

  /**
   * 占位符
   * @default "请选择"
   */
  placeholder?: React.ReactNode;

  /**
   * 是否展示遮罩
   * @default true
   */
  mask?: boolean;

  /**
   * 点击蒙层是否关闭弹出层
   * @default true
   */
  maskClosable?: boolean;
}

interface SelectSingleProps extends SelectBaseProps, ControlledProps<string> {
  /**
   * 是否为多选模式
   *
   * **建议总是传递 `false` 以完善类型推断**
   */
  multiple?: false;

  /**
   * 下拉按钮的后缀内容
   *
   * **用于展示数字等重要信息，空间不足时该区域不会被省略**
   *
   * @docType React.ReactNode | ((selectedOptions: SelectOption) => React.ReactNode)
   */
  buttonSuffix?:
    | React.ReactNode
    | ((selectedOptions: SelectOption) => React.ReactNode);

  /**
   * 下拉按钮的内容
   *
   * @docType React.ReactNode | ((selectedOptions: SelectOption) => React.ReactNode)
   */
  button?:
    | React.ReactNode
    | ((selectedOptions: SelectOption) => React.ReactNode);
}

interface SelectMultipleProps
  extends SelectBaseProps,
    ControlledProps<string[]> {
  /**
   * 是否为多选模式
   */
  multiple: true;

  /**
   * 下拉按钮的后缀内容
   *
   * **用于展示数字等重要信息，空间不足时该区域不会被省略**
   *
   * @docType React.ReactNode | ((selectedOptions: SelectOption[]) => React.ReactNode)
   */
  buttonSuffix?:
    | React.ReactNode
    | ((selectedOptions: SelectOption[]) => React.ReactNode);

  /**
   * 下拉按钮的内容
   *
   * @docType React.ReactNode | ((selectedOptions: SelectOption[]) => React.ReactNode)
   */
  button?:
    | React.ReactNode
    | ((selectedOptions: SelectOption[]) => React.ReactNode);

  /**
   * 是否展示全选选项
   *
   * @default false
   */
  all?: false | SelectOption;
}

export interface SelectOption {
  /**
   * 选项标识
   */
  value?: string;

  /**
   * 描述文字
   */
  text?: React.ReactNode;

  // /**
  //  * 描述后缀
  //  *
  //  * **空间不足时不会被省略**
  //  */
  // suffix?: React.ReactNode;

  // /**
  //  * 是否禁用
  //  * @default false
  //  */
  // disabled?: boolean;
}

const defaultButton: SelectProps["button"] = value => {
  if (value && !Array.isArray(value)) {
    return value.text || value.value;
  }
  return null;
};

// 保证当前只有一个 Select 展开
let current = null;

export function Select(props: SelectProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  const {
    name,
    options = [],
    multiple,
    placeholder = "请选择",
    value,
    loading = false,
    onChange = noop,
    className,
    button = defaultButton,
    buttonSuffix = null,
    mask = true,
    maskClosable = true,
    all,
    ...restProps
  } = useDefaultValue<string | string[], SelectProps & { all?: SelectOption }>(
    props as any,
    props.multiple ? [] : undefined
  );

  const idRef = useRef(uuid());
  const selectRef = useRef(null);

  const [selected, setSelected] = useState(value);
  const [dropdown, setDropdown] = useState(false);

  const [top, setTop] = useState(0);

  const hide = () => setDropdown(false);

  useCatchMove(dropdown);

  useEffect(() => {
    if (dropdown) {
      if (current && idRef.current !== current.id) {
        current.hide();
      }
      current = { id: idRef.current, hide };
    }
  }, [dropdown]);

  useEffect(() => {
    setSelected(value);
  }, [value, dropdown]);

  const handleToggle = async (e: ITouchEvent) => {
    e.stopPropagation();

    if (loading) {
      return;
    }

    if (!dropdown) {
      const [{ top = 0, height = 0 }] = await getRect(selectRef);
      setTop(top + height);
      setDropdown(true);
    } else {
      hide();
    }
  };

  return (
    <div 
      className={classNames(`${classPrefix}-select`, className)}
      {...restProps}
      ref={selectRef}
    >
      <div className={`${classPrefix}-select__header`}>
        <div className={`${classPrefix}-select__main`}>
          <div 
            className={`${classPrefix}-select__option`}
            onClick={handleToggle}
          >
            {loading ? (
              <label className={`${classPrefix}-select__loading`}>
                {t.loading}
              </label>
            ) : (
              <div 
                className={classNames(`${classPrefix}-select__cell`, {
                  "is-active": dropdown,
                })}
              >
                <div className={`${classPrefix}-select__value`}>
                  {injectValue(button)(
                    !multiple
                      ? options.find(option => option.value === value)
                      : [...options, all]
                          .filter(Boolean)
                          .filter(option => value.includes(option.value))
                  ) || placeholder}
                </div>
                <div className={`${classPrefix}-select__suffix`}>
                  {injectValue(buttonSuffix)(
                    !multiple
                      ? options.find(option => option.value === value)
                      : [...options, all]
                          .filter(Boolean)
                          .filter(option => value.includes(option.value))
                  ) || ""}
                </div>
                <Icon
                  name="arrowdown"
                  className={classNames(`${classPrefix}-select__arrowdown`)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {dropdown && (
        <div catchMove>
          <Popper>
            <div 
              className={`${classPrefix}-select__backdrop`}
              onClick={maskClosable ? hide : noop}
            />
            <div 
              className={`${classPrefix}-select__body`}
              style={{ top: `${top}px` }}
            >
              <div 
                className={`${classPrefix}-select__mask`}
                style={{
                  height: `calc(100vh - ${top}px)`,
                  backgroundColor: mask ? undefined : "transparent",
                }}
                onClick={maskClosable ? hide : noop}
              />
              <div className={`${classPrefix}-select__wrap`}>
                <div className={`${classPrefix}-select__container`}>
                  {multiple ? (
                    <div>
                      <ScrollView
                        scrollY
                        className={`${classPrefix}-select__group_wrap`}
                        style={{ maxHeight: `calc(100vh - ${top + 88}px)` }}
                      >
                        <Checkbox.Group
                          type="button"
                          value={selected as string[]}
                          onChange={value => {
                            if (all) {
                              setSelected(selected => {
                                if (
                                  !selected.includes(all.value) &&
                                  value.includes(all.value)
                                ) {
                                  return [all.value];
                                }
                                if (
                                  selected.includes(all.value) &&
                                  value.length > 1
                                ) {
                                  return value.filter(i => i !== all.value);
                                }
                                return value;
                              });
                            } else {
                              setSelected(value);
                            }
                          }}
                        >
                          {all && (
                            <Checkbox name={all.value}>
                              {all.text || all.value}
                            </Checkbox>
                          )}
                          {options.map((option, _index) => (
                            <Checkbox key={option.value} name={option.value}>
                              {option.text || option.value}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </ScrollView>
                      <div className={`${classPrefix}-select__btn_wrap`}>
                        <Button
                          onClick={() => {
                            hide();
                            setSelected(value);
                          }}
                        >
                          {t.cancelText}
                        </Button>
                        <Button
                          type="primary"
                          onClick={event => {
                            onChange(selected as any, { event });
                            hide();
                          }}
                        >
                          {t.confirmText}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <ScrollView
                      scrollY
                      style={{ maxHeight: `calc(100vh - ${top}px)` }}
                    >
                      <List>
                        {options.map((option, _index) => (
                          <List.Item
                            size="auto"
                            key={option.value}
                            title={option.text || option.value}
                            onClick={event => {
                              onChange(option.value as any, { event });
                              hide();
                            }}
                          >
                            {value === option.value && (
                              <Icon
                                name="check"
                                className={`${classPrefix}-select__check`}
                              />
                            )}
                          </List.Item>
                        ))}
                      </List>
                    </ScrollView>
                  )}
                </div>
              </div>
            </div>
          </Popper>
        </div>
      )}
    </div>
  );
}
