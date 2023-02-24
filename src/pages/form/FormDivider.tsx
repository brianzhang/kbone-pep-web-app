import { View } from "@tarojs/components";
import React from "react";
import { useConfig } from "../_util/use-config";

export function FormDivider() {
  const { classPrefix } = useConfig();
  return <div className={`${classPrefix}-form-divider`} />;
}
