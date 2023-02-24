import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  Button,
  DatePicker,
  Form,
  Modal,
  ConfigProvider,
  ComponentProvider,
  setConfig,
} from "@tencent/tea-component-mobile";

// setConfig({ locale: "en" });

export default function ConfigProviderExample() {
  const [dateValue, setDateValue] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <ConfigProvider locale="en">
      <ComponentProvider>
        <div className="page">
          <label className="header">ConfigProvider 全局配置</label>
          <Form title="基本用法">
            <DatePicker
              value={dateValue}
              onChange={value => {
                setDateValue(value);
              }}
            >
              <Form.Item label="DatePicker" arrow>
                {dateValue}
              </Form.Item>
            </DatePicker>
            <Form.Item label="Modal" arrow onClick={() => setVisible(true)}>
              <Modal
                visible={visible}
                onVisibleChange={setVisible}
                title="Title"
                content="Content"
              />
            </Form.Item>
          </Form>
          <div className="section">
            <Button
              onClick={() =>
                Modal.show({
                  title: "Title",
                  content: "Content",
                  hideCancel: true,
                  onConfirm: () => console.log("confirm"),
                })
              }
            >
              Modal
            </Button>
          </div>
        </div>
      </ComponentProvider>
    </ConfigProvider>
  );
}
