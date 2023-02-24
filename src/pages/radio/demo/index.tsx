import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Radio, List } from "@tencent/tea-component-mobile";

export default function RadioExample() {
  const [item, setItem] = useState(null);

  return (
    <div className="page">
      <label className="header">Radio 单选框</label>

      <div className="section">
        <div className="header">基本用法</div>
        <Radio defaultChecked>勾选</Radio>
      </div>

      <div className="section">
        <div className="header">单选框组</div>
        <Radio.Group>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3" disabled>
            选项3
          </Radio>
        </Radio.Group>
      </div>

      <div className="section">
        <div className="header">受控用法</div>
        <Radio.Group block value={item} onChange={item => setItem(item)}>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
        </Radio.Group>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Radio.Group block defaultValue="2" type="button">
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
          <Radio name="4">选项4</Radio>
          <Radio name="5">较长的选项5</Radio>
          <Radio name="6">更长一点的选项6</Radio>
        </Radio.Group>
      </div>

      <div className="header">与 List 组件结合</div>
      <List>
        <Radio.Group defaultValue="2">
          <List.Item title="标题1" before={<Radio name="1" />}>
            内容1
          </List.Item>
          <List.Item title="标题2" before={<Radio name="2" />}>
            内容2
          </List.Item>
        </Radio.Group>
      </List>
    </div>
  );
}
