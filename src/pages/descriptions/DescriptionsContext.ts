import React from "react";

export interface DescriptionsContextValue {
  /**
   * 描述项 label 部分的宽度
   */
  labelWidth?: number | string;

  /**
   * 描述项 extra 部分的宽度
   */
  extraWidth?: number | string;
}

export const DescriptionsContext = React.createContext<
  DescriptionsContextValue
>({});
