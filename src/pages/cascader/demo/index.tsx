import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  Form,
  Cascader,
  HeaderBar,
  Picker,
} from "@tencent/tea-component-mobile";
import { data } from "./data";

export default function CascaderExample() {
  const [options, setOptions] = useState([]);
  return (
    <div className="page">
      <label className="header">Cascader 级联选择</label>
      <Form title="基本用法">
        <Cascader
          data={data}
          title="级联选择标题"
          onChange={(value, { options }) => {
            console.log(value);
            setOptions(options);
          }}
        >
          <Form.Item label="级联选择" placeholder="请选择" arrow>
            {options.map(option => option.label).join(" / ")}
          </Form.Item>
        </Cascader>
      </Form>

      <div className="header">弹出位置</div>
      <HeaderBar>
        <Cascader
          data={data}
          position="reference"
          onChange={(value, { options }) => {
            console.log(value);
            setOptions(options);
          }}
        >
          <Picker.Button placeholder="请选择">
            {options.map(option => option.label).join(" / ")}
          </Picker.Button>
        </Cascader>
      </HeaderBar>
    </div>
  );
}
