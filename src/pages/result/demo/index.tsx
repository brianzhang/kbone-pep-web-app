import React from "react";
import { View, Text } from "@tarojs/components";
import { Result, Button, List, Icon } from "@tencent/tea-component-mobile";

import "./index.less";

export default function ResultExample() {
  return (
    <div className="page">
      <label className="header">Result 结果</label>

      <label className="header">状态场景</label>
      <div className="example-content">
        <Result
          scene="success"
          title="操作成功"
          description="信任登录设备，7 天内无需身份验证"
        >
          <Button.Group>
            <Button type="primary">页面主操作</Button>
            <Button>页面次要操作</Button>
          </Button.Group>
        </Result>
      </div>

      <label className="header">空白场景</label>
      <div className="example-content">
        <Result
          scene="blank"
          title="暂无资源"
          description="请切换筛选条件后重试"
        >
          <Button size="sm">了解产品特性</Button>
        </Result>
      </div>

      <label className="header">
        底部内容（可配置 footerFixed 属性固定置页面底部）
      </label>
      <div className="example-content">
        <Result
          scene="pending"
          title="操作中"
          description="信任登录设备，7 天内无需身份验证"
          footer="注册腾讯云 | 关注公众号"
        >
          <Button type="primary">页面主操作</Button>
        </Result>
      </div>

      <div className="example-content">
        <Result
          scene="error"
          title="操作失败"
          description="信任登录设备，7 天内无需身份验证"
          footer={
            <List title="你可能需要">
              <List.Item title="免费领取云资源" arrow />
              <List.Divider />
              <List.Item title="购买云服务器" arrow />
            </List>
          }
        >
          <Button.Group>
            <Button type="primary">页面主操作</Button>
            <Button>页面次要操作</Button>
          </Button.Group>
        </Result>
      </div>

      <label className="header">自定义图标</label>
      <div className="example-content">
        <Result
          icon="//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea2/tea-component-mobile/src/result/style/images/renew-all.svg"
          title="暂无续费项"
          description="当前没有待续费项"
        >
          <Button.Group type="horizontal">
            <Button size="md" type="primary">
              页面主操作
            </Button>
            <Button size="md">页面次要操作</Button>
          </Button.Group>
        </Result>
      </div>
      <div className="example-content">
        <Result
          icon="star-fill"
          title="标题"
          description="信任登录设备，7 天内无需身份验证"
        >
          <Button type="primary">页面主操作</Button>
        </Result>
      </div>
      <div className="example-content">
        <Result
          icon={<Icon size={120} name="star-fill" color="#FF9C19" />}
          title="标题"
          description="信任登录设备，7 天内无需身份验证"
        >
          <Button type="primary">页面主操作</Button>
        </Result>
      </div>
    </div>
  );
}
