import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { CollapseContext } from "./CollapseContext";
import { Icon } from "../icon";
import { StyledProps } from "../_type";
import { injectValue } from "../_util/inject-value";
import { getRect } from "../_util/get-rect";
import { useIsReady } from "../_util/use-is-ready";
import { useConfig } from "../_util/use-config";

export interface CollapsePanelProps extends StyledProps {
  /**
   * 面板唯一标识
   */
  id: string;

  /**
   * 头部标题
   * @docType React.ReactNode | ((active: boolean) => React.ReactNode)
   */
  title?: React.ReactNode | ((active: boolean) => React.ReactNode);

  /**
   * 头部右侧额外内容
   * @docType React.ReactNode | ((active: boolean) => React.ReactNode)
   */
  extra?: React.ReactNode | ((active: boolean) => React.ReactNode);

  /**
   * 内容
   */
  children?: React.ReactNode;
}

export function CollapsePanel({
  id,
  title,
  extra,
  children,
  className,
  style,
}: CollapsePanelProps) {
  const { classPrefix } = useConfig();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const { activeIds, onActive } = useContext(CollapseContext);
  const active = activeIds.includes(id);

  const isReady = useIsReady();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (active) {
      getRect(ref).then(rect => {
        if (rect?.[0]) {
          setHeight(rect[0].height);
        }
      });
    } else {
      setHeight(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // 首次渲染立即获取高度有差异
  useEffect(() => {
    if (isReady && active) {
      setTimeout(() => {
        getRect(ref).then(rect => {
          if (rect?.[0]) {
            setHeight(rect[0].height);
          }
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, children]);

  function handleClick(event) {
    if (active) {
      onActive(
        activeIds.filter(activeId => activeId !== id),
        { event, activeId: id, active: !active }
      );
    } else {
      onActive([...activeIds, id], { event, activeId: id, active: !active });
    }
  }

  return (
    <div 
      className={classNames(
        `${classPrefix}-collapse-panel`,
        `${classPrefix}-hairline--top`,
        className,
        {
          "is-active": active,
        }
      )}
      style={style}
    >
      <div 
        className={`${classPrefix}-collapse-panel__header`}
        onClick={handleClick}
      >
        <div 
          className={`${classPrefix}-collapse-panel__title ${classPrefix}-ellipsis`}
        >
          {injectValue(title)(active)}
        </div>
        <div className={`${classPrefix}-collapse-panel__extra`}>
          {injectValue(extra)(active)}
        </div>
        <Icon
          className={`${classPrefix}-collapse-panel__arrow`}
          name="chevrondown"
        />
      </div>
      <div 
        className={`${classPrefix}-collapse-panel__wrap ${classPrefix}-hairline--top`}
        style={{ height: `${height}px` }}
      >
        <div className={`${classPrefix}-collapse-panel__content`} ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
}
