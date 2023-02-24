import React, { useState } from "react";
import { pxTransform } from "@tarojs/taro";
import {
  Picker,
  Level,
  Form,
  Tag,
  Typography,
  DatePicker,
  HeaderBar,
} from "@tencent/tea-component-mobile";
import "./index.less";

const data = {
  selector: ["美国", "中国", "巴西", "日本"],
  selectorChecked: "美国",
  dateSel: "2018-04-22",
  multiArray: [
    ["无脊柱动物", "脊柱动物"],
    ["扁性动物", "线形动物", "环节动物", "软体动物", "节肢动物"],
    ["猪肉绦虫", "吸血虫"],
  ],
};

export default function PickerExample() {
  const [selectorValue, setSelectorValue] = useState(null);
  const [multiSelectorValue, setMultiSelectorValue] = useState(null);
  const [dateSelectorValue, setDateSelectorValue] = useState(null);
  const [dateSelectorValue2, setDateSelectorValue2] = useState(null);
  const [regionSelectorValue, setRegionSelectorValue] = useState([
    "广东省",
    "广州市",
    "海珠区",
  ]);

  return (
    <div className="page">
      <label className="header">Picker 选择器</label>
      <Form title="基本用法">
        <Picker
          mode="selector"
          range={data.selector}
          value={selectorValue}
          onChange={value => {
            console.log(value);
            setSelectorValue(value);
          }}
        >
          <Form.Item label="普通选择器" placeholder="请选择" arrow>
            {data.selector[selectorValue]}
          </Form.Item>
        </Picker>

        <Picker
          mode="multiSelector"
          range={data.multiArray}
          value={multiSelectorValue}
          onChange={value => {
            console.log(value);
            setMultiSelectorValue(value);
          }}
        >
          <Form.Item label="多列选择器" placeholder="请选择" arrow>
            {multiSelectorValue && (
              <div>
                {data.multiArray[0][multiSelectorValue[0]]}，
                {data.multiArray[1][multiSelectorValue[1]]}，
                {data.multiArray[2][multiSelectorValue[2]]}
              </div>
            )}
          </Form.Item>
        </Picker>
      </Form>

      <label className="header">日期/时间选择</label>
      <label className="text">📅 详见 DatePicker 组件</label>

      {/* 小程序可用 */}
      {process.env.TARO_ENV === "weapp" && (
        <Form title="小程序可用">
          <Picker
            mode="region"
            value={regionSelectorValue}
            onChange={value => {
              console.log(value);
              setRegionSelectorValue(value);
            }}
          >
            <Form.Item label="地区选择器" placeholder="请选择" arrow>
              {regionSelectorValue}
            </Form.Item>
          </Picker>
        </Form>
      )}
      <Form title="选项自定义">
        <Picker
          mode="selector"
          range={[
            <div key={0}>
              选项一 <Tag>标签</Tag>
            </div>,
            <div key={1}>
              选项二 <Tag type="primary">标签</Tag>
            </div>,
            <div key={2}>
              选项三 <Tag type="success">标签</Tag>
            </div>,
          ]}
          onChange={value => {
            console.log(value);
          }}
        >
          <Form.Item label="复杂选项" placeholder="请选择" arrow />
        </Picker>
        {/* 默认样式单行高 34px */}
        <Picker
          mode="selector"
          indicatorStyle="height: 68px"
          range={[
            <div key={0}>
              <div>选项一</div>
              <div>（更多描述）</div>
            </div>,
            <div key={1}>
              <div>选项二</div>
              <div>（更多描述）</div>
            </div>,
            <div key={2}>
              <div>选项三</div>
              <div>（更多描述）</div>
            </div>,
          ]}
          onChange={value => {
            console.log(value);
          }}
        >
          <Form.Item label="多行选项" placeholder="请选择" arrow />
        </Picker>
      </Form>
      <label className="header">触发按钮</label>
      <div className="section">
        <DatePicker
          style={{ width: "auto", display: "inline-block" }}
          mode="date"
          value={dateSelectorValue}
          onChange={value => {
            console.log(value);
            setDateSelectorValue(value);
          }}
        >
          <Picker.Button placeholder="请选择">
            {dateSelectorValue}
          </Picker.Button>
        </DatePicker>
      </div>
      <div className="section">
        <Level
          style={{ justifyContent: "center" }}
          startWidth={pxTransform(240, 750)}
          endWidth={pxTransform(240, 750)}
          start={
            <DatePicker
              mode="date"
              value={dateSelectorValue}
              onChange={value => {
                console.log(value);
                setDateSelectorValue(value);
              }}
            >
              <Picker.Button placeholder="请选择">
                {dateSelectorValue}
              </Picker.Button>
            </DatePicker>
          }
          end={
            <DatePicker
              style={{ flex: 1 }}
              mode="date"
              value={dateSelectorValue2}
              onChange={value => {
                console.log(value);
                setDateSelectorValue2(value);
              }}
            >
              <Picker.Button placeholder="请选择">
                {dateSelectorValue2}
              </Picker.Button>
            </DatePicker>
          }
        >
          <Typography.Text size="sm">至</Typography.Text>
        </Level>
      </div>

      <label className="header">嵌入顶栏</label>
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
