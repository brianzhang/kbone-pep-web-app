import React from "react";
import { View, Text } from "@tarojs/components";
import { Tag } from "@tencent/tea-component-mobile";

import "./index.less";

export default function TagExample() {
  return (
    <div className="page">
      <label className="header">Tag 标签</label>

      <label className="header">基本用法</label>
      <div className="section">
        <Tag>标签</Tag>
        <Tag type="primary">标签</Tag>
        <Tag type="success">标签</Tag>
        <Tag type="warning">标签</Tag>
        <Tag type="danger">标签</Tag>
      </div>

      <label className="header">浅色样式</label>
      <div className="section">
        <Tag light>标签</Tag>
        <Tag light type="primary">
          标签
        </Tag>
        <Tag light type="success">
          标签
        </Tag>
        <Tag light type="warning">
          标签
        </Tag>
        <Tag light type="danger">
          标签
        </Tag>
      </div>

      <label className="header">圆角样式</label>
      <div className="section">
        <Tag round>标签</Tag>
        <Tag round type="primary">
          标签
        </Tag>
        <Tag round type="success">
          标签
        </Tag>
        <Tag round type="warning">
          标签
        </Tag>
        <Tag round type="danger">
          标签
        </Tag>
      </div>

      <label className="header">空心样式</label>
      <div className="section">
        <Tag outline>标签</Tag>
        <Tag outline type="primary">
          标签
        </Tag>
        <Tag outline type="success">
          标签
        </Tag>
        <Tag outline type="warning">
          标签
        </Tag>
        <Tag outline type="danger">
          标签
        </Tag>
      </div>
    </div>
  );
}
