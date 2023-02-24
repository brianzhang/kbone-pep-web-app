import React, {
  useContext,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import classNames from "classnames";
import { ITouchEvent, View, Image } from "@tarojs/components";
import { Icon } from "../icon";
import { useDefault } from "../_util/use-default";
import { callBoth } from "../_util/call-both";
import { StyledProps, ChangeContext } from "../_type";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface CheckProps extends StyledProps {
  /**
   * 选框的名称，对于 `Group` 等管理时必传
   */
  name?: string;

  /**
   * 选中状态
   */
  checked?: boolean;

  /**
   * 默认选中状态
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * 点击回调函数
   */
  onChange?: (
    checked: boolean,
    context: ChangeContext<ITouchEvent<any>>
  ) => void;

  /**
   * 是否为单选
   * @default false
   */
  radio?: boolean;

  /**
   * 是否可用
   * @default false
   */
  disabled?: boolean;

  /**
   * 选框样式
   * @default "default"
   */
  type?: "default" | "square" | "button" | "agreement";

  /**
   * 是否显示为块级元素
   * @default false
   */
  block?: boolean;

  /**
   * 选中状态颜色
   * @default "#006EFF"
   */
  color?: string;

  /**
   * 选框中内容
   */
  children?: React.ReactNode;

  /**
   * 点击时触发
   */
  onClick?: (event: ITouchEvent<any>) => void;

  /**
   * type 为 button 时有效，选框插入的图片，第二张参数为 checked 时的图片
   */
  images?: [string, string?];
}

/**
 * Check 组件支持使用 CheckContext 进行状态托管
 */
export const CheckContext = React.createContext<CheckContextValue>(null);

/**
 * 托管 Check 组件的状态，请提供 inject() 方法注入托管好的 props
 */
export interface CheckContextValue {
  inject: (props: CheckProps) => CheckProps;
}

export interface CheckInstance {
  trigger: (event: ITouchEvent<any>) => void;
}

const DEFAULT_COLOR = "#006EFF";

export const Check = forwardRef(
  (
    { color = DEFAULT_COLOR, ...restProps }: CheckProps,
    ref: React.MutableRefObject<CheckInstance>
  ) => {
    const { classPrefix } = useConfig();
    // 支持从 Context 注入
    const context = useContext(CheckContext);
    let props = restProps;
    if (context) {
      props = context.inject(restProps);
    }

    const {
      defaultChecked = false,
      checked,
      onChange: onCheckedChange,
      radio,
      children,
      disabled = false,
      block,
      type,
      onClick,
      className,
      style,
      images,
      ...htmlProps
    } = props;

    const [value, onChange] = useDefault(
      checked,
      defaultChecked,
      onCheckedChange
    );

    useImperativeHandle(
      ref,
      () => ({
        trigger: event => {
          if (disabled) {
            return;
          }
          onChange(!value, { event });
        },
      }),
      [onChange, value, disabled]
    );

    const iconSize = useMemo(() => {
      if (type === "agreement") {
        return TaroEnv ? 32 : 16;
      }
      return TaroEnv ? 40 : 20;
    }, [type]);

    return (
      <div 
        className={classNames(`${classPrefix}-checkbox-wrap`, className, {
          "is-checked": value,
          "is-disabled": disabled,
          [`${classPrefix}-checkbox__wrap--block`]: block,
          [`${classPrefix}-checkbox__wrap--agreement`]: type === "agreement",
          [`${classPrefix}-checkbox__wrap--outline`]: type === "button",
        })}
        style={style}
        onClick={callBoth(onClick, event => {
          event.stopPropagation();
          if (disabled) {
            return;
          }
          onChange(!value, { event });
        })}
        {...htmlProps}
      >
        {type !== "button" && (
          <div 
            className={classNames(`${classPrefix}-checkbox`, {
              [`${classPrefix}-checkbox--square`]:
                type === "square" || type === "agreement",
            })}
          >
            {value && <Icon name="check" color="#fff" size={iconSize} />}
          </div>
        )}
        {type === "button" && images && images.length > 0 && (
          <Image
            className={`${classPrefix}-checkbox__image`}
            src={images[images.length > 1 && value ? 1 : 0]}
            mode="aspectFit"
          />
        )}
        <div className={`${classPrefix}-checkbox__label`}>{children}</div>
      </div>
    );
  }
);
