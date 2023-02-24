import React from "react";
import Taro from "@tarojs/taro";
import { Search } from "@tencent/tea-component-mobile";
import "./index.less";

export default function SearchExample() {
  return (
    <div className="page">
      <label className="header">Search 搜索</label>
      <div className="header">基本用法</div>
      <Search placeholder="开始搜索吧~" onSearch={console.log} />
      <div className="header">禁用状态</div>
      <Search placeholder="开始搜索吧~" disabled />
      <div className="header">显示取消按钮</div>
      <Search
        placeholder="开始搜索吧~"
        showCancel
        onCancel={() => console.log("取消搜索")}
      />
      <div className="header">不显示搜索图标</div>
      <Search placeholder="开始搜索吧~" hideIcon />

      <div className="header">与顶栏结合的下拉选择</div>
      <div className="header">
        见{" "}
        <div 
          className="link"
          onClick={() => {
            Taro.navigateTo({ url: "/header-bar/demo/index" });
          }}
        >
          HeaderBar
        </div>{" "}
        组件。
      </div>
    </div>
  );
}
