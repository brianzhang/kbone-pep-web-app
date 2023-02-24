import React from "react";
import { View, Text } from "@tarojs/components";
import { Slider } from "@tencent/tea-component-mobile";

export default function SliderExample() {
  return (
    <div className="page">
      <label className="header">Slider 滑块</label>

      <div className="section">
        <label className="header">基本用法</label>
        <Slider />
      </div>

      <div className="section">
        <label className="header">禁用状态</label>
        <Slider defaultValue={30} disabled />
      </div>

      <div className="section">
        <label className="header">不展示描述内容</label>
        <Slider defaultValue={50} formatter={() => null} />
      </div>

      <div className="section">
        <label className="header">自定义描述内容</label>
        <Slider defaultValue={40} formatter={value => `${value} 台`} />
      </div>

      <div className="section">
        <label className="header">自定义取值范围</label>
        <Slider defaultValue={40} max={50} min={10} />
      </div>

      <div className="section">
        <label className="header">自定义步长</label>
        <Slider step={10} />
      </div>
    </div>
  );
}
