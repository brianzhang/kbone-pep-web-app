import React from "react";
import { View, Text } from "@tarojs/components";
import { WhiteSpace, Button } from "@tencent/tea-component-mobile";
import "./index.less";

export default function WhiteSpaceExample() {
  return (
    <div className="page">
      <label className="header">WhiteSpace 留白</label>

      <label className="header">上下留白</label>
      <div className="demo-box" />
      <WhiteSpace />
      <div className="demo-box" />

      <label className="header">两侧留白</label>
      <WhiteSpace>
        <div className="demo-box" />
        <WhiteSpace />
        <div className="demo-box" />
      </WhiteSpace>

      <label className="header">
        底部留白（为贴底 Button 等组件上部预留空间）
      </label>
      <div className="demo-fixed">
        <div className="demo-box" />
        <Button fixed type="primary">
          贴底按钮
        </Button>
        <WhiteSpace bottom />
      </div>
    </div>
  );
}
