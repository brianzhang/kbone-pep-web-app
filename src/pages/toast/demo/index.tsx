import React from "react";
import { View, Text } from "@tarojs/components";
import {
  ComponentProvider,
  Toast,
  Button,
} from "@tencent/tea-component-mobile";

export default function ToastExample() {
  return (
    <ComponentProvider>
      <div className="page">
        <label className="header">Toast 轻提示</label>
        <div className="section">
          <Button onClick={() => Toast.show({ content: "提示" })}>
            文本提示
          </Button>
        </div>
        <div className="section">
          <Button onClick={() => Toast.loading({ content: "加载中" })}>
            Loading
          </Button>
        </div>
        <div className="section">
          <Button
            onClick={() =>
              Toast.show({
                content: "成功提示",
                icon: { name: "success", color: "#ffffff" },
              })
            }
          >
            自定义图标
          </Button>
        </div>
        <div className="section">
          <Button type="danger" onClick={() => Toast.hide()}>
            隐藏提示
          </Button>
        </div>
      </div>
    </ComponentProvider>
  );
}
