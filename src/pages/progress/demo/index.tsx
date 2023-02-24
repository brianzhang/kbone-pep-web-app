import React from "react";
import { View, Text } from "@tarojs/components";
import { Progress } from "@tencent/tea-component-mobile";

export default function ProgressExample() {
  return (
    <div className="page">
      <label className="header">Progress 进度条</label>

      <div className="section">
        <label className="header">基本用法</label>
        <Progress percent={50} />
      </div>

      <div className="section">
        <label className="header">禁用状态</label>
        <Progress percent={30} status="disabled" />
      </div>

      <div className="section">
        <label className="header">成功状态</label>
        <Progress percent={100} />
      </div>

      <div className="section">
        <label className="header">警告状态</label>
        <Progress percent={10} status="danger" />
      </div>

      <div className="section">
        <label className="header">不展示描述内容</label>
        <Progress percent={50} formatter={() => null} />
      </div>

      <div className="section">
        <label className="header">自定义描述内容</label>
        <Progress percent={40} formatter={percent => `${percent}/100`} />
      </div>
    </div>
  );
}
