import React from "react";
import { View, Text } from "@tarojs/components";
import { Check } from "@tencent/tea-component-mobile";

export default function CheckExample() {
  return (
    <div className="page">
      <label className="header">Check 选项按钮</label>
      <div className="section">
        <Check>选项按钮</Check>
      </div>
    </div>
  );
}
