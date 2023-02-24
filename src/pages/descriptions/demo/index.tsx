import React from "react";
import { View, Text } from "@tarojs/components";
import {
  Button,
  Typography,
  Card,
  Descriptions,
} from "@tencent/tea-component-mobile";

export default function DescriptionsExample() {
  return (
    <div className="page">
      <label className="header">Descriptions 描述列表</label>
      <Card>
        <Card.Body title="主机信息">
          <Descriptions>
            <Descriptions.Item
              label="名称"
              arrow
              onClick={() => console.log("click")}
            >
              主机名称
            </Descriptions.Item>
            <Descriptions.Item label="示例 ID">ins-k6nvxxxu</Descriptions.Item>
            <Descriptions.Item
              label="UUID"
              extra={<Typography.Link url="/">重置密码</Typography.Link>}
            >
              3466756d-9fbe-4b66-90f3-5b2f0b161784
            </Descriptions.Item>
            <Descriptions.Item
              label="状态"
              extra={
                <Button text type="primary">
                  调整状态
                </Button>
              }
            >
              <Typography.Text theme="success">运行中</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="超过六个字换行">
              1234567890
            </Descriptions.Item>
          </Descriptions>
        </Card.Body>
      </Card>
    </div>
  );
}
