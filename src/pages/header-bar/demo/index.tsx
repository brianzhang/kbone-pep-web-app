import React from "react";
import { View, Text } from "@tarojs/components";
import {
  DatePicker,
  HeaderBar,
  Picker,
  Select,
} from "@tencent/tea-component-mobile";
import "./index.less";

const options = [
  { text: "芝士霉霉", value: "1" },
  { text: "多肉葡挞", value: "2" },
  { text: "芋泥波波", value: "3" },
  { text: "热超厚蛋糕阿华田波波", value: "4" },
];

export default function SelectExample() {
  return (
    <div className="page">
      <label className="header">HeaderBar 顶栏</label>

      <div className="header">基本用法</div>
      <HeaderBar>
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
        />
      </HeaderBar>

      <HeaderBar>
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
        />
        <Select
          multiple
          all={{ value: "all", text: "全部" }}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
          button={selectedOptions => (selectedOptions.length ? "奶茶" : "")}
          buttonSuffix={selectedOptions => {
            if (selectedOptions.find(option => option.value === "all")) {
              return `(${options.length})`;
            }
            return selectedOptions.length ? `(${selectedOptions.length})` : "";
          }}
        />
      </HeaderBar>

      <HeaderBar>
        <Select
          loading
          multiple={false}
          placeholder="请选择奶茶"
          options={[]}
        />
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
          buttonSuffix={option => {
            if (!option) {
              return "(-)";
            }
            return option.value === "4" ? "(热)" : "(冰)";
          }}
        />
        <Select
          multiple
          all={{ value: "all", text: "全部" }}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
          button={selectedOptions => (selectedOptions.length ? "奶茶" : "")}
          buttonSuffix={selectedOptions => {
            if (selectedOptions.find(option => option.value === "all")) {
              return `(${options.length})`;
            }
            return selectedOptions.length ? `(${selectedOptions.length})` : "";
          }}
        />
      </HeaderBar>

      <div className="header">支持搜索</div>
      <HeaderBar searchable={{ onSearch: console.log }}>
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
        />
      </HeaderBar>

      <HeaderBar searchable={{ onSearch: console.log }}>
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
        />
        <Select
          multiple
          all={{ value: "all", text: "全部" }}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
          button={selectedOptions => (selectedOptions.length ? "奶茶" : "")}
          buttonSuffix={selectedOptions => {
            if (selectedOptions.find(option => option.value === "all")) {
              return `(${options.length})`;
            }
            return selectedOptions.length ? `(${selectedOptions.length})` : "";
          }}
        />
      </HeaderBar>

      <HeaderBar searchable={{ onSearch: console.log }}>
        <Select
          loading
          multiple={false}
          placeholder="请选择奶茶"
          options={[]}
        />
        <Select
          multiple={false}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
        />
        <Select
          multiple
          all={{ value: "all", text: "全部" }}
          placeholder="请选择奶茶"
          options={options}
          onChange={console.log}
          button={selectedOptions => (selectedOptions.length ? "奶茶" : "")}
          buttonSuffix={selectedOptions => {
            if (selectedOptions.find(option => option.value === "all")) {
              return `(${options.length})`;
            }
            return selectedOptions.length ? `(${selectedOptions.length})` : "";
          }}
        />
      </HeaderBar>

      <div className="header">嵌入自定义按钮</div>
      <HeaderBar>
        <DatePicker mode="date">
          <Picker.Button placeholder="选择日期" />
        </DatePicker>
        <DatePicker mode="time">
          <Picker.Button placeholder="选择时间" />
        </DatePicker>
      </HeaderBar>
    </div>
  );
}
