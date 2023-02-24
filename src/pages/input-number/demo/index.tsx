import React from "react";
import { View, Text } from "@tarojs/components";
import { InputNumber } from "@tencent/tea-component-mobile";

export default function InputNumberExample() {
  return (
    <div className="page">
      <label className="header">InputNumber 数字输入</label>
      <label className="header">基本用法</label>
      <div className="section">
        <InputNumber min={0} max={10} />
      </div>
      <label className="header">调整步长</label>
      <div className="section">
        <InputNumber min={0} max={100} defaultValue={5} step={5} />
      </div>
      <label className="header">调整精度</label>
      <div className="section">
        <InputNumber min={0} max={10} precision={1} step={0.1} />
      </div>
    </div>
  );
}
