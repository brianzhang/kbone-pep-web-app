import React from "react";
import { View, Text } from "@tarojs/components";
import { Popup, Button, InputNumber } from "@tencent/tea-component-mobile";
import "./index.less";

export default function PopupExample() {
  return (
    <div className="page">
      <label className="header">Popup 弹出层</label>

      <div className="section">
        <Popup
          position="top"
          overlay={close => (
            <div className="box">
              <InputNumber />
              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
        >
          <Button>顶部弹出</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          position="center"
          overlay={close => (
            <div className="box">
              <InputNumber />
              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
          offset={80}
        >
          <Button>中间弹出</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          position="bottom"
          overlay={close => (
            <div className="box">
              <InputNumber />

              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
          offset={80}
        >
          <Button>底部弹出</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          position="left"
          overlay={close => (
            <div className="box" style={{ height: "100%" }}>
              <InputNumber />

              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
          offset={80}
        >
          <Button>左侧弹出</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          position="right"
          overlay={close => (
            <div className="box" style={{ height: "100%" }}>
              <InputNumber />

              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
          offset={80}
        >
          <Button>右侧弹出</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          mask={false}
          position="bottom"
          overlay={close => (
            <div className="box">
              <InputNumber />
              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
        >
          <Button>底部弹出无遮罩</Button>
        </Popup>
      </div>

      <div className="section">
        <Popup
          position="bottom"
          destroyOnClose={false}
          overlay={close => (
            <div className="box">
              <InputNumber />
              <Button type="primary" onClick={close}>
                点击关闭
              </Button>
            </div>
          )}
        >
          <Button danger>关闭时不销毁</Button>
        </Popup>
      </div>
    </div>
  );
}
