import React from "react";
import { View, Text } from "@tarojs/components";
import { Alert, Button, Typography } from "@tencent/tea-component-mobile";
import "./index.less";

export default function AlertExample() {
  return (
    <div className="page">
      <label className="header">Alert 提示条</label>

      <label className="header">基本用法</label>
      <Alert type="info">
        微信接收消息尚未开通，查看
        <Typography.Link url="/">开通指引</Typography.Link>
      </Alert>
      <Alert type="error">
        主体信息异常，请提交
        <Button text type="primary">
          工单
        </Button>
        处理
      </Alert>

      <label className="header">可关闭</label>
      <Alert
        type="info"
        closeable
        onClose={() => {
          console.log("close");
        }}
      >
        微信接收消息尚未开通，查看
        <Button text type="primary">
          开通指引
        </Button>
      </Alert>

      <label className="header">可点击</label>
      <Alert
        type="info"
        closeable
        onClick={() => {
          console.log("click");
        }}
      >
        这个是可点击提示条
      </Alert>

      <label className="header">自动关闭</label>
      <Alert duration={3000}>提示内容</Alert>
    </div>
  );
}
