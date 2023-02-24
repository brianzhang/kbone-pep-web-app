import React from "react";
import { View, Text } from "@tarojs/components";
import {
  Collapse,
  Card,
  Descriptions,
  Typography,
} from "@tencent/tea-component-mobile";

export default function CollapseExample() {
  return (
    <div className="page">
      <label className="header">Collapse 折叠面板</label>
      <label className="header">基本用法</label>
      <Collapse defaultActiveIds={["1"]} onActive={ids => console.log(ids)}>
        <Collapse.Panel id="1" title="云服务器">
          <Card>
            <Card.Body>
              <Descriptions>
                <Descriptions.Item label="名称">主机名称</Descriptions.Item>
                <Descriptions.Item label="示例 ID">
                  ins-k6nvxxxu
                </Descriptions.Item>
                <Descriptions.Item label="UUID">
                  3466756d-9fbe-4b66-90f3-5b2f0b161784
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Typography.Text theme="success">运行中</Typography.Text>
                </Descriptions.Item>
              </Descriptions>
            </Card.Body>
          </Card>
        </Collapse.Panel>
        <Collapse.Panel id="2" title="CDN 流量包" extra="￥ 288.00">
          <Card>
            <Card.Body>流量包</Card.Body>
          </Card>
        </Collapse.Panel>
      </Collapse>

      <label className="header">手风琴模式</label>
      <Collapse accordion onActive={ids => console.log(ids)}>
        <Collapse.Panel id="1" title="面板一">
          <Card>
            <Card.Body>面板一</Card.Body>
          </Card>
        </Collapse.Panel>
        <Collapse.Panel id="2" title="面板二">
          <Card>
            <Card.Body>面板二</Card.Body>
          </Card>
        </Collapse.Panel>
        <Collapse.Panel id="3" title="面板三">
          <Card>
            <Card.Body>面板三</Card.Body>
          </Card>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
