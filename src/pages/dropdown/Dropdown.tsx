import React, { useEffect, useRef, useState } from "react";
import { getSystemInfoSync } from "@tarojs/taro";
import classNames from "classnames";
import { useConfig } from "../_util/use-config";
import { StyledProps } from "../_type";
import { useIsReady } from "../_util/use-is-ready";
import { useOutsideClick } from "../_util/use-outside-click";
import { getRect } from "../_util/get-rect";
import { TaroEnv } from "../_util/env";

const getWindowHeight = () => {
  return TaroEnv === "weapp"
    ? getSystemInfoSync().windowHeight
    : window.innerHeight;
};

export interface DropdownProps extends StyledProps {
  /**
   * 控制下拉是否展示
   */
  visible: boolean;
  /**
   * 触发下拉内容，会直接渲染
   */
  children?: React.ReactNode;
  /**
   * 自定义下拉展示内容
   */
  overlay: React.ReactNode;
  /**
   * 自定义下拉样式
   */
  overlayStyle?: React.CSSProperties;
  /**
   * `visible` 变化时回调
   */
  onVisibleChange?: (visible: boolean) => void;
}

export function Dropdown({
  className = "",
  visible = false,
  children,
  overlay,
  overlayStyle = {},
  onVisibleChange,
}: DropdownProps) {
  const { classPrefix } = useConfig();
  const [state, setState] = useState({
    attachmentHeight: "0px",
    placement: "bottom",
    positionCalculated: false,
  });
  const isReady = useIsReady();
  const attachmentRef = useRef(null);
  const overlayRef = useRef(null);
  const timerRef = useRef(null);

  const { listen } = useOutsideClick([attachmentRef, overlayRef]);

  listen(() => {
    onVisibleChange && onVisibleChange(false);
  });

  function getOverlayPosition() {
    if (!state.positionCalculated) {
      return { top: "-9999px" };
    }

    return state.placement === "bottom"
      ? { top: state.attachmentHeight, left: 0 }
      : { bottom: state.attachmentHeight, left: 0 };
  }

  // 计算下拉方向（默认向下展开）
  useEffect(() => {
    if (isReady) {
      if (visible) {
        timerRef.current = setTimeout(() => {
          Promise.all([getRect(attachmentRef), getRect(overlayRef)]).then(
            ([
              [{ height: attachmentHeight, top: attachmentTop }],
              [{ height: overlayHeight }],
            ]) => {
              // const { windowHeight } = getSystemInfoSync();
              const windowHeight = getWindowHeight();
              if (
                windowHeight - attachmentTop - attachmentHeight >=
                overlayHeight
              ) {
                setState({
                  attachmentHeight: `${attachmentHeight}px`,
                  placement: "bottom",
                  positionCalculated: true,
                });
              } else {
                setState({
                  attachmentHeight: `${attachmentHeight}px`,
                  placement: "top",
                  positionCalculated: true,
                });
              }
            }
          );
        }, 100);
      } else {
        setState({ ...state, positionCalculated: false });
      }
    }

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isReady, children, overlay, visible]);

  return (
    <div className={classNames(`${classPrefix}-dropdown`, className)}>
      <div 
        className={classNames(`${classPrefix}-dropdown__attachment`)}
        ref={attachmentRef}
      >
        {children}
      </div>
      {visible && (
        <div 
          className={classNames(`${classPrefix}-dropdown__overlay`)}
          style={{
            ...getOverlayPosition(),
            ...overlayStyle,
          }}
          ref={overlayRef}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}
