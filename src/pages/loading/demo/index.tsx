import React from "react";
import { View, Text } from "@tarojs/components";
import { Loading } from "@tencent/tea-component-mobile";
import "./index.less";

export default function LoadingExample() {
  return (
    <div className="page">
      <label className="header">Loading 加载中</label>
      <div className="section">
        <label className="header">基本用法</label>
        <div className="item">
          <Loading />
        </div>
      </div>
      <div className="section">
        <label className="header">包含文字</label>
        <div className="item">
          <Loading>加载中 ...</Loading>
        </div>
        <div className="item">
          <Loading vertical>加载中 ...</Loading>
        </div>
      </div>
    </div>
  );
}
