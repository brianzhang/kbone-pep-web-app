import React from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { CommonProps } from "../_type";
import { Icon } from "../icon";
import { Blank } from "../icon/svg";
import { TaroEnv } from "../_util/env";
import { useConfig } from "../_util/use-config";

export interface ResultProps extends CommonProps {
  /**
   * 预置场景
   */
  scene?: "blank" | "success" | "error" | "pending";

  /**
   * 自定义图标
   */
  icon?: React.ReactNode;

  /**
   * 标题
   */
  title?: React.ReactNode;

  /**
   * 描述
   */
  description?: React.ReactNode;

  /**
   * 尾部内容
   */
  footer?: React.ReactNode;

  /**
   * footer 内容是否固定在页面底部
   */
  footerFixed?: boolean;
}

export function Result({
  className,
  children,
  scene,
  icon,
  title,
  description,
  footer,
  footerFixed,
  ...props
}: ResultProps) {
  const { classPrefix } = useConfig();
  return (
    <div className={classNames(`${classPrefix}-result`, className)} {...props}>
      <ResultHeader scene={scene} icon={icon} />
      <div className={`${classPrefix}-result__body`}>
        {title && (
          <div className={`${classPrefix}-result__title`}>{title}</div>
        )}
        {description && (
          <div className={`${classPrefix}-result__description`}>
            {description}
          </div>
        )}
        {children}
      </div>
      <div 
        className={classNames(`${classPrefix}-result__footer`, {
          [`${classPrefix}-result__footer--fixed`]: footerFixed,
        })}
      >
        {footer}
      </div>
    </div>
  );
}

interface ResultHeaderProps extends ResultProps {}

const sceneMap: Record<ResultProps["scene"], React.ReactNode> = {
  blank: <Icon size={TaroEnv ? 120 : 60} name={Blank} />,
  success: <Icon size={TaroEnv ? 120 : 60} name="success" color="#29CC85" />,
  error: <Icon size={TaroEnv ? 120 : 60} name="warning" color="#FF584C" />,
  pending: <Icon size={TaroEnv ? 120 : 60} name="pending" color="#006EFF" />,
};

function ResultHeader({ scene, icon }: ResultHeaderProps) {
  const { classPrefix } = useConfig();
  let children = sceneMap[scene];
  if (!children) {
    children = icon;
    if (typeof icon === "string") {
      if (icon.includes("/")) {
        children = <Icon size={TaroEnv ? 400 : 200} name={icon} />;
      } else {
        children = <Icon size={TaroEnv ? 120 : 60} name={icon} />;
      }
    }
  }
  return <div className={`${classPrefix}-result__header`}>{children}</div>;
}
