import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Checkbox, List } from "@tencent/tea-component-mobile";

export default function CheckboxExample() {
  const [items, setItems] = useState([]);

  return (
    <div className="page">
      <label className="header">Checkbox 复选框</label>

      <div className="section">
        <div className="header">基本用法</div>
        <Checkbox defaultChecked>勾选</Checkbox>
      </div>

      <div className="section">
        <div className="header">复选框组</div>
        <Checkbox.Group>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3" disabled>
            选项3
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">受控用法</div>
        <Checkbox.Group value={items} onChange={items => setItems(items)}>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">方框样式</div>
        <Checkbox.Group type="square">
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3" disabled>
            选项3
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">block</div>
        <Checkbox.Group block>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Checkbox.Group block defaultValue={["2"]} type="button">
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
          <Checkbox name="4">选项4</Checkbox>
          <Checkbox name="5">较长的选项5</Checkbox>
          <Checkbox
            name="6"
            images={[
              "https://imgcache.qq.com/qcloud/tcloud_dtc/static/other_external_resource/453d35eb-fa03-4a5d-a0cf-4be275a58f08.svg",
              "https://imgcache.qq.com/qcloud/tcloud_dtc/static/other_external_resource/955eb509-b4c4-449c-a521-b1700617608e.svg",
            ]}
          >
            更长一点的选项6
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="header">与 List 组件结合</div>
      <List>
        <Checkbox.Group defaultValue={["2"]} type="square">
          <List.Item title="标题1" before={<Checkbox name="1" />}>
            内容1
          </List.Item>
          <List.Item title="标题2" before={<Checkbox name="2" />}>
            内容2
          </List.Item>
        </Checkbox.Group>
      </List>

      <div className="section">
        <div className="header">同意协议条款</div>
        <Checkbox name="agreement" type="agreement" onChange={console.log}>
          Yes, I do.
        </Checkbox>
      </div>
    </div>
  );
}
