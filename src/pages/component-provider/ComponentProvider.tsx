import React, { createContext, useContext } from "react";
import { Toast } from "../toast";
import { Message } from "../message";
import { ModalManager } from "../modal/ModalManager";
import { ActionSheetManager } from "../action-sheet";
import { captureOutsideClick } from "../_util/use-outside-click";

export interface ComponentContextValue {}

const ComponentContext = createContext<ComponentContextValue>(null);
export interface ComponentProviderProps extends ComponentContextValue {
  /**
   * 子组件
   */
  children?: React.ReactNode;
}
export function ComponentProvider({ children }: ComponentProviderProps) {
  const parentContext = useContext(ComponentContext);

  return (
    <ComponentContext.Provider value={{}}>
      {children}
      {!parentContext && (
        <div>
          {/* 预埋 API 方式使用组件 */}
          <Toast />
          <Message />
          <ModalManager />
          <ActionSheetManager />
        </div>
      )}
    </ComponentContext.Provider>
  );
}

ComponentProvider.captureOutsideClick = captureOutsideClick;
