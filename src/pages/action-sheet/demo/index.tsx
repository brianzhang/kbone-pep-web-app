import React from "react";
import { View, Text } from "@tarojs/components";
import {
  ActionSheet,
  Button,
  ComponentProvider,
} from "@tencent/tea-component-mobile";

export default function ActionSheetExample() {
  return (
    <ComponentProvider>
      <div className="page">
        <label className="header">ActionSheet 动作面板</label>
        <label className="header">基本用法</label>
        <div className="section">
          <Button
            onClick={() =>
              ActionSheet.show({
                options: ["选项一", "选项二"],
                onSelect: index => console.log(index),
              })
            }
          >
            动作面板
          </Button>
        </div>

        <label className="header">面板标题</label>
        <div className="section">
          <Button
            onClick={() =>
              ActionSheet.show({
                title: "面板标题说明",
                options: ["选项一", "选项二"],
                onSelect: index => console.log(index),
              })
            }
          >
            动作面板
          </Button>
        </div>

        <label className="header">选项配置</label>
        <div className="section">
          <Button
            onClick={() =>
              ActionSheet.show({
                title: "面板标题说明",
                options: [
                  { name: "选项一" },
                  { name: "选项二", description: "选项说明文案" },
                  { name: "选项三", disabled: true },
                  { name: "选项四", destructive: true },
                ],
                onSelect: index => console.log(index),
              })
            }
          >
            动作面板
          </Button>
        </div>
      </div>
    </ComponentProvider>
  );
}
