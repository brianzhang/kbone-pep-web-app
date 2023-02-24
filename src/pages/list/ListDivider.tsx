import { View } from "@tarojs/components";
import React from "react";
import { useConfig } from "../_util/use-config";

export function ListDivider() {
  const { classPrefix } = useConfig();
  return <div className={`${classPrefix}-list-divider`} />;
}
