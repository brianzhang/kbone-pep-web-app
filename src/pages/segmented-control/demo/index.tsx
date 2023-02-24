import React from "react";
import { View, Text } from "@tarojs/components";
import { SegmentedControl } from "@tencent/tea-component-mobile";

export default function SegmentedControlExample() {
  return (
    <div className="page">
      <label className="header">SegmentedControl 分段器</label>
      <label className="header">基本用法</label>
      <SegmentedControl
        values={["实时", "昨天", "近 7 天"]}
        onChange={console.log}
      />
      <label className="header">更多场景</label>
      <SegmentedControl
        values={["这是第一项", "第二", "第三项六个字", "第四项"]}
        onChange={console.log}
      />
    </div>
  );
}
