import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { BaseEventOrig, View } from "@tarojs/components";
import { Popup } from "../popup";
import { CommonProps, ControlledProps } from "../_type";
import { List } from "../list";
import { useDefaultValue } from "../_util/use-default";
import { Icon } from "../icon";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";
import { Popper } from "../popper";
import { getRect } from "../_util/get-rect";

/**
 * 选项数据
 */
export interface CascaderOption {
  /**
   * 选项值
   */
  value: string;

  /**
   * 选项文案
   */
  label: React.ReactNode;

  /**
   * 子级数据
   */
  children?: CascaderOption[];

  /**
   * 是否为禁用状态
   * @default false
   */
  disabled?: boolean;

  // /**
  //  * 是否为叶子节点
  //  *
  //  * 配合 `loadData` 使用
  //  * @default false
  //  */
  // isLeaf?: boolean;
}

export interface CascaderProps
  extends ControlledProps<
      string[],
      BaseEventOrig<any>,
      { options: CascaderOption[]; event: BaseEventOrig<any> }
    >,
    CommonProps {
  /**
   * 选项数据
   */
  data: CascaderOption[];

  /**
   * 弹出位置
   * @default "bottom"
   */
  position?: "bottom" | "reference";

  // /**
  //  * 是否每级选项变化都触发改变
  //  * @default false
  //  */
  // changeOnSelect?: boolean;

  /**
   * 选择器标题
   */
  title?: React.ReactNode;

  // /**
  //  * 动态加载数据，**需要返回 Promise**
  //  *
  //  * 在 `data` 中某级包含不包含 `options` 时且`isLeaf` 为 `false` 时调用
  //  */
  // onLoad?: (value: string[], options: CascaderOption[]) => Promise<void>;
}

function getOptions(
  data: CascaderOption[],
  valueList: string[]
): CascaderOption[] {
  const options = [];

  let curLevel = data;
  valueList.forEach(value => {
    const option: CascaderOption = curLevel?.find(
      option => option.value === value
    ) || { value, label: null };

    options.push(option);

    if (option && option.children) {
      curLevel = option.children;
    } else {
      curLevel = [];
    }
  });

  return options.filter(Boolean);
}

export function Cascader(props: CascaderProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  const {
    data = [],
    value,
    onChange,
    title,
    className,
    style,
    children,
    position = "bottom",
  } = useDefaultValue(props, []);
  const [top, setTop] = useState(0);
  const [visible, setVisible] = useState(false);

  const containerRef = useRef(null);

  const hide = () => setVisible(false);

  const handleToggle = async () => {
    if (!visible) {
      const [{ top = 0, height = 0 }] = await getRect(containerRef);
      setTop(top + height);
      setVisible(true);
    } else {
      hide();
    }
  };

  // 内部状态
  const [internalValue, setInternalValue] = useState(value || []);
  useLayoutEffect(() => {
    setInternalValue(value);
  }, [value]);
  const internalOptions = useMemo(() => getOptions(data, internalValue), [
    data,
    internalValue,
  ]);
  // 展示面板序号
  const panelIndex = useMemo(() => {
    if (internalOptions.length <= 1) {
      return 0;
    }
    return internalOptions[internalOptions.length - 1].children
      ? internalOptions.length - 1
      : internalOptions.length - 2;
  }, [internalOptions]);

  const lists = useMemo(() => {
    const lists = [data];
    for (let i = 0; i < internalValue.length; ++i) {
      const option = lists[i]?.find(
        option => option.value === internalValue[i]
      );
      if (option && option.children) {
        lists.push(option.children);
      } else {
        break;
      }
    }
    return lists;
  }, [data, internalValue]);

  function handleSelect(index, value, { event, hasChild }) {
    const newValue = [...internalValue.slice(0, index), value];

    setInternalValue(newValue);
    if (!hasChild) {
      onChange(newValue, { event, options: getOptions(data, newValue) });
      setVisible(false);
    }
  }

  const overlay = (
    <div 
      className={classNames(`${classPrefix}-cascader`, className)}
      style={style}
    >
      {title && (
        <div 
          className={`${classPrefix}-cascader__title ${classPrefix}-hairline--bottom`}
        >
          {title}
        </div>
      )}
      <div 
        className={`${classPrefix}-cascader__header ${classPrefix}-hairline--bottom`}
      >
        {internalOptions.map((option, index) => {
          const key = [...internalValue.slice(0, index), option.value].join(
            "$"
          );
          return (
            <div 
              key={key}
              className={`${classPrefix}-cascader__tag`}
              onClick={() => {
                setInternalValue(internalValue.slice(0, index + 1));
              }}
            >
              {option.label || option.value}
            </div>
          );
        })}
        {(!internalOptions.length ||
          internalOptions[internalOptions.length - 1].children) && (
          <div className={`${classPrefix}-cascader__tag is-active`}>
            {t.pleaseSelect}
          </div>
        )}
      </div>
      <div className={`${classPrefix}-cascader__body`}>
        <div className={`${classPrefix}-cascader__body-inner`}>
          <div 
            className={`${classPrefix}-cascader__box`}
            style={{
              transform: `translateX(-${
                panelIndex < 1 ? 0 : panelIndex * 33.333
              }%)`,
            }}
          >
            {lists.map((list, index) => {
              return (
                <List
                  scrollY
                  className={classNames(`${classPrefix}-cascader__list`, {
                    light: index !== panelIndex,
                  })}
                  key={["initial", ...internalValue]
                    .slice(0, index + 1)
                    .join("$")}
                >
                  {list.map(option => {
                    const selected = internalValue[index] === option.value;
                    const key = [
                      ...internalValue.slice(0, index),
                      option.value,
                    ].join("$");

                    return (
                      <List.Item
                        key={key}
                        title={
                          <div 
                            className={classNames(
                              `${classPrefix}-cascader__label`,
                              {
                                "is-active": selected,
                                "is-disabled": option.disabled,
                              }
                            )}
                          >
                            {option.label || option.value}
                          </div>
                        }
                        onClick={event => {
                          if (option.disabled) {
                            return;
                          }
                          handleSelect(index, option.value, {
                            event,
                            hasChild: Boolean(option.children),
                          });
                        }}
                      >
                        {selected && <Icon name="check" />}
                      </List.Item>
                    );
                  })}
                </List>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (position === "reference") {
    return (
      <div className={`${classPrefix}-cascader__container`} ref={containerRef}>
        <div className={`${classPrefix}-cascader__ref`} onClick={handleToggle}>
          {children}
        </div>
        {visible && (
          <div catchMove>
            <Popper>
              <div 
                className={`${classPrefix}-cascader__ref_backdrop`}
                onClick={hide}
              />
              <div 
                className={`${classPrefix}-cascader__ref_body`}
                style={{ top: `${top}px` }}
              >
                <div 
                  className={`${classPrefix}-cascader__ref_mask`}
                  style={{
                    height: `calc(100vh - ${top}px)`,
                  }}
                  onClick={hide}
                />
                {overlay}
              </div>
            </Popper>
          </div>
        )}
      </div>
    );
  }

  return (
    <Popup
      visible={visible}
      onVisibleChange={visible => {
        setVisible(visible);
      }}
      onClose={() => {
        setInternalValue(value);
      }}
      overlay={overlay}
    >
      {children}
    </Popup>
  );
}
