import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  Button,
  ComponentProvider,
  Modal,
} from "@tencent/tea-component-mobile";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function ModalExample() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <div className="page">
      <label className="header">Modal 模态框</label>

      <label className="header">基本用法</label>
      <div className="section">
        <Modal
          visible={visible1}
          onVisibleChange={setVisible1}
          title="标题"
          content="告知当前状态，信息和解决方法，描述文字尽量控制在三行内"
          onCancel={() => console.log("cancel")}
          onConfirm={() => console.log("confirm")}
        />
        <Button onClick={() => setVisible1(true)}>点击弹出</Button>
      </div>

      <label className="header">API 用法</label>
      <ComponentProvider>
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
            点击弹出
          </Button>
        </div>
      </ComponentProvider>

      <label className="header">异步关闭</label>
      <div className="section">
        <Modal
          visible={visible2}
          onVisibleChange={setVisible2}
          title="标题"
          content="告知当前状态，信息和解决方法，描述文字尽量控制在三行内"
          onCancel={async () => {
            await sleep(1000);
            console.log("cancel");
          }}
          onConfirm={async () => {
            await sleep(1000);
            console.log("confirm");
          }}
        />
        <Button onClick={() => setVisible2(true)}>点击弹出</Button>
      </div>
    </div>
  );
}
