import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Picker,
  Radio,
} from "@tencent/tea-component-mobile";

const selectorData = ["美国", "中国", "巴西", "日本"];

export default function FormExample() {
  const [pickerValue, setPickerValue] = useState(null);
  return (
    <div className="page">
      <label className="header">Form 表单</label>
      <Form title="基本用法">
        <Form.Item label="标题文字">内容文字</Form.Item>

        <Form.Item label="标题文字">
          <div>
            <div>内容文字</div>
            <div>内容文字</div>
            <div>内容文字</div>
          </div>
        </Form.Item>

        <Form.Item label="标题文字" placeholder="输入提示文字" />

        <Form.Item required label="标题文字">
          <Input placeholder="输入提示文字" />
        </Form.Item>

        <Form.Item label="标题文字" message="提示文字">
          <Input placeholder="输入提示文字" />
        </Form.Item>

        <Form.Item label="标题文字" error message="提示文字">
          <Input placeholder="输入提示文字" />
        </Form.Item>

        <Form.Item label="标题文字" error="异常提示文字" message="提示文字">
          <Input placeholder="输入提示文字" />
        </Form.Item>

        <Form.Item label="超过六个字折行展示">
          <Input placeholder="输入提示文字" />
        </Form.Item>

        <Form.Divider />

        <Picker
          mode="selector"
          range={selectorData}
          value={pickerValue}
          onChange={value => {
            setPickerValue(value);
          }}
        >
          <Form.Item label="选择器" placeholder="请选择" arrow>
            {selectorData[pickerValue]}
          </Form.Item>
        </Picker>

        <Form.Divider />

        <Form.Item label="标题文字" vertical>
          <Radio.Group block defaultValue="2" type="button">
            <Radio name="1">选项1</Radio>
            <Radio name="2">选项2</Radio>
            <Radio name="3">选项3</Radio>
            <Radio name="4">选项4</Radio>
            <Radio name="5">较长的选项5</Radio>
            <Radio name="6">更长一点的选项6</Radio>
          </Radio.Group>
        </Form.Item>

        <Checkbox.Group defaultValue={["2"]}>
          <Form.Item label="选项描述文字">
            <Checkbox name="1" />
          </Form.Item>
          <Form.Item label="选项描述文字">
            <Checkbox name="2" />
          </Form.Item>
        </Checkbox.Group>

        <Form.Divider />

        <Form.Item label="标题文字" vertical>
          &lt; 可插入自定义组件 &gt;
        </Form.Item>

        <Form.Divider />

        <Button type="primary">提交</Button>
      </Form>
    </div>
  );
}
