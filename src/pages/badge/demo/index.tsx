import React from "react";
import { View, Text } from "@tarojs/components";
import { Badge, Button } from "@tencent/tea-component-mobile";
import "./index.less";

export default function BadgeExample() {
  return (
    <div className="page">
      <label className="header">Badge 徽章</label>

      <div className="section">
        <label className="header">数字</label>
        <Badge info="99+">
          <Button size="sm">数字</Button>
        </Badge>
      </div>

      <div className="section">
        <label className="header">文本</label>
        <Badge info="New">
          <Button size="sm">文本</Button>
        </Badge>
      </div>

      <div className="section">
        <label className="header">小红点</label>
        <Badge dot>
          <Button size="sm">小红点</Button>
        </Badge>
      </div>

      <div className="section">
        <label className="header">方形</label>
        <Badge square info="88 折" style={{ display: "block" }}>
          <Button>配合长按钮使用</Button>
        </Badge>
      </div>

      <div className="section">
        <label className="header">自定义背景色</label>
        <Badge square info="88 折" color="#FF9C19" style={{ display: "block" }}>
          <Button>配合长按钮使用</Button>
        </Badge>
      </div>
    </div>
  );
}
