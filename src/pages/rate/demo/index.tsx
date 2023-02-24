import React from "react";
import { View, Text } from "@tarojs/components";
import { Rate, Icon } from "@tencent/tea-component-mobile";

export default function RateExample() {
  return (
    <div className="page">
      <label className="header">Rate 评分</label>
      <label className="header">基础用法</label>
      <div className="section">
        <Rate defaultValue={3} onChange={value => console.log(value)} />
      </div>
      <label className="header">半星</label>
      <div className="section">
        <Rate
          allowHalf
          defaultValue={3.5}
          onChange={value => console.log(value)}
        />
      </div>
      <label className="header">只读</label>
      <div className="section">
        <Rate allowHalf defaultValue={3.5} readonly />
      </div>
      <label className="header">自定义字符</label>
      <div className="section">
        <Rate allowHalf defaultValue={3.5} character={<Icon name="star" />} />
      </div>
      <div className="section">
        <Rate allowHalf defaultValue={3.5} character="棒" />
      </div>
      <div className="section">
        <Rate defaultValue={3.5} character={({ index }) => String(index)} />
      </div>
    </div>
  );
}
