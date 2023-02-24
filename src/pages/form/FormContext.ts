import React from "react";

export interface FormContextValue {
  /**
   * 表单项 label 部分的宽度
   */
  labelWidth?: number | string;
}

export const FormContext = React.createContext<FormContextValue>({});

// export interface FormItemContextValue {
//   /**
//    * 是否禁用
//    * @default false
//    */
//   disabled?: boolean;
// }

// export const FormItemContext = React.createContext<FormItemContextValue>({});
