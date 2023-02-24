import React from "react";
import { View, Text } from "@tarojs/components";
import {
  ComponentProvider,
  Message,
  Button,
} from "@tencent/tea-component-mobile";

// Message.config({ offset: "30px" });

export default function MessageExample() {
  return (
    <ComponentProvider>
      <div className="page">
        <label className="header">Message 消息提示</label>
        <div className="section">
          <Button onClick={() => Message.info({ content: "普通提示消息" })}>
            普通提示
          </Button>
        </div>
        <div className="section">
          <Button onClick={() => Message.success({ content: "成功提示消息" })}>
            成功提示
          </Button>
        </div>
        <div className="section">
          <Button onClick={() => Message.warning({ content: "警示提示消息" })}>
            警示提示
          </Button>
        </div>
        <div className="section">
          <Button onClick={() => Message.error({ content: "危险提示消息" })}>
            危险提示
          </Button>
        </div>
        <div className="section">
          <Button
            onClick={() =>
              Message.loading({ content: "加载中或流程正在进行中" })
            }
          >
            加载中提示
          </Button>
        </div>
        <div className="section">
          <Button danger onClick={() => Message.hide()}>
            隐藏提示
          </Button>
        </div>
      </div>
    </ComponentProvider>
  );
}
