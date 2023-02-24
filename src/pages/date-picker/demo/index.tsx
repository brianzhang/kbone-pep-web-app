import React, { useState } from "react";
import { pxTransform } from "@tarojs/taro";
import {
  Picker,
  Level,
  Form,
  Typography,
  DatePicker,
} from "@tencent/tea-component-mobile";

export default function DatePickerExample() {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [dateTimeValue, setDateTimeValue] = useState(null);

  const [dateValue2, setDateValue2] = useState(null);
  const [timeValue2, setTimeValue2] = useState(null);
  const [dateTimeValue2, setDateTimeValue2] = useState(null);

  const [timeValue3, setTimeValue3] = useState(null);
  const [dateValue3, setDateValue3] = useState(null);

  const [timeValue4, setTimeValue4] = useState(null);

  const [dateSelectorValue, setDateSelectorValue] = useState(null);
  const [dateSelectorValue2, setDateSelectorValue2] = useState(null);

  return (
    <div className="page">
      <label className="header">DatePicker 日期选择</label>

      <Form title="基本用法">
        <DatePicker
          value={dateValue}
          onChange={value => {
            console.log(value);
            setDateValue(value);
          }}
        >
          <Form.Item label="日期选择" placeholder="请选择" arrow>
            {dateValue}
          </Form.Item>
        </DatePicker>

        <DatePicker
          mode="time"
          value={timeValue}
          onChange={value => {
            console.log(value);
            setTimeValue(value);
          }}
        >
          <Form.Item label="时间选择" placeholder="请选择" arrow>
            {timeValue}
          </Form.Item>
        </DatePicker>

        <DatePicker
          mode="datetime"
          value={dateTimeValue}
          onChange={value => {
            console.log(value);
            setDateTimeValue(value);
          }}
        >
          <Form.Item label="日期 & 时间" placeholder="请选择" arrow>
            {dateTimeValue}
          </Form.Item>
        </DatePicker>
      </Form>

      <Form title="起止约束">
        <DatePicker
          value={dateValue2}
          start="2020-01-31"
          end="2022-11-30"
          onChange={value => {
            console.log(value);
            setDateValue2(value);
          }}
        >
          <Form.Item label="日期选择" placeholder="请选择" arrow>
            {dateValue2}
          </Form.Item>
        </DatePicker>

        <DatePicker
          mode="time"
          value={timeValue2}
          start="09:30"
          end="20:15"
          onChange={value => {
            console.log(value);
            setTimeValue2(value);
          }}
        >
          <Form.Item label="时间选择" placeholder="请选择" arrow>
            {timeValue2}
          </Form.Item>
        </DatePicker>

        <DatePicker
          mode="datetime"
          value={dateTimeValue2}
          start="2020-01-31 10:00"
          end="2022-11-30 22:30"
          onChange={value => {
            console.log(value);
            setDateTimeValue2(value);
          }}
        >
          <Form.Item label="日期 & 时间" placeholder="请选择" arrow>
            {dateTimeValue2}
          </Form.Item>
        </DatePicker>
      </Form>

      <Form title="时间步长">
        <DatePicker
          mode="time"
          value={timeValue3}
          step={{
            hour: 2,
            minute: 15,
          }}
          onChange={value => {
            console.log(value);
            setTimeValue3(value);
          }}
        >
          <Form.Item label="时间选择" placeholder="请选择" arrow>
            {timeValue3}
          </Form.Item>
        </DatePicker>
      </Form>

      <Form title="自定义格式">
        <DatePicker
          format="HH:mm:ss"
          value={timeValue4}
          step={{
            hour: 4,
            minute: 5,
            second: 30,
          }}
          onChange={value => {
            console.log(value);
            setTimeValue4(value);
          }}
        >
          <Form.Item label="时间选择" placeholder="请选择" arrow>
            {timeValue4}
          </Form.Item>
        </DatePicker>
        <DatePicker
          value={dateValue3}
          format="YYYY 年 MM 月 DD 日"
          onChange={value => {
            console.log(value);
            setDateValue3(value);
          }}
        >
          <Form.Item label="日期选择" placeholder="请选择" arrow>
            {dateValue3}
          </Form.Item>
        </DatePicker>
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
    </div>
  );
}
