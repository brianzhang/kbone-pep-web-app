import React from "react";
import { View, Text } from "@tarojs/components";
import {
  ComponentProvider,
  Button,
  Modal,
  Toast,
  Message,
  ActionSheet,
} from "@tencent/tea-component-mobile";

export default function ComponentProviderExample() {
  return (
    <ComponentProvider>
      <div className="page">
        <label className="header">ComponentProvider 组件支持</label>
        <label className="header">基本用法</label>
        <div className="section">
          <Button onClick={() => Toast.loading({ content: "加载中 ..." })}>
            Toast
          </Button>
        </div>
        <div className="section">
          <Button onClick={() => Message.success({ content: "成功提示" })}>
            Message
          </Button>
        </div>
        <div className="section">
          <Button
            onClick={() =>
              Modal.show({
                title: "标题",
                content:
                  "告知当前状态，信息和解决方法，描述文字尽量控制在三行内",
                hideCancel: true,
                onConfirm: () => console.log("confirm"),
              })
            }
          >
            Modal
          </Button>
        </div>
        <div className="section">
          <Button
            onClick={() =>
              ActionSheet.show({
                options: ["选项一", "选项二"],
                onSelect: index => console.log(index),
              })
            }
          >
            ActionSheet
          </Button>
        </div>
      </div>
    </ComponentProvider>
  );
}
