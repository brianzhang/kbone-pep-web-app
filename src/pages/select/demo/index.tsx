import React from "react";
import Taro from "@tarojs/taro";
import { ComponentProvider, Select } from "@tencent/tea-component-mobile";
import "./index.less";

const options = [
  { text: "芝士霉霉", value: "1" },
  { text: "多肉葡挞", value: "2" },
  { text: "芋泥波波", value: "3" },
  { text: "椰椰奶冻", value: "4" },
];

export default function SelectExample() {
  return (
    <div className="page">
      <label className="header">Select 下拉选择</label>
      <label className="header">基本用法</label>

      <Select
        multiple={false}
        placeholder="请选择奶茶"
        options={options}
        onChange={value => console.log(value)}
      />

      <label className="header">多选</label>
      <Select
        multiple
        all={{ value: "all", text: "全部" }}
        placeholder="请选择奶茶"
        options={options}
        onChange={value => console.log(value)}
        button={selectedOptions => (selectedOptions.length ? "奶茶" : "")}
        buttonSuffix={selectedOptions => {
          if (selectedOptions.find(option => option.value === "all")) {
            return `(${options.length})`;
          }
          return selectedOptions.length ? `(${selectedOptions.length})` : "";
        }}
      />

      <label className="header">加载中</label>
      <Select loading placeholder="请选择奶茶" options={options} />

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
