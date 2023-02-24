import { CommonEventFunction } from "@tarojs/components/types/common";
import { createContext } from "react";

export interface CollapseContextValue {
  /**
   * 当前激活的面板 ID
   */
  activeIds: string[];

  /**
   * 面板激活变化回调
   */
  onActive: (
    activeIds: string[],
    context: { event: CommonEventFunction; activeId: string; active: boolean }
  ) => void;
}

export const CollapseContext = createContext<CollapseContextValue>({
  activeIds: [],
  onActive: () => null,
});
