import React from "react";
import { View, Text } from "@tarojs/components";
import { Typography } from "@tencent/tea-component-mobile";

export default function TypographyExample() {
  return (
    <div className="page">
      <label className="header">Typography 排版</label>
      <label className="header">标题</label>
      <div className="section">
        <Typography.Heading>一级标题</Typography.Heading>
        <Typography.Heading level={2}>二级标题</Typography.Heading>
        <Typography.Heading level={3}>三级标题</Typography.Heading>
        <Typography.Heading level={4}>四级标题</Typography.Heading>
        <Typography.Heading level={5}>五级标题</Typography.Heading>
      </div>

      <label className="header">文本</label>
      <div className="section">
        <div>
          <Typography.Text>default 基本文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="light">light 较浅文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="disabled">disabled 禁用文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="primary">primary 主文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="success">success 成功文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="warning">warning 警告文字</Typography.Text>
        </div>
        <div>
          <Typography.Text theme="danger">danger 异常文字</Typography.Text>
        </div>
      </div>

      <label className="header">超链接</label>
      <div className="section">
        <Typography.Link url="">超链接</Typography.Link>
      </div>

      <label className="header">溢出省略</label>
      <div className="section">
        <Typography.Heading level={3} ellipsis>
          两只老虎爱跳舞，小兔子乖乖拔萝卜，我和小鸭子学走路，童年是最美的礼物。
        </Typography.Heading>
        <Typography.Text ellipsis>
          两只老虎爱跳舞，小兔子乖乖拔萝卜，我和小鸭子学走路，童年是最美的礼物。
        </Typography.Text>
      </div>
    </div>
  );
}
