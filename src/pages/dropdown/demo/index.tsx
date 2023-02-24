import React, { useState } from "react";
import { View } from "@tarojs/components";
import {
  Dropdown,
  Search,
  List,
  Icon,
  ComponentProvider,
} from "@tencent/tea-component-mobile";

export default function PopoverExample() {
  const [visible, setVisible] = useState(false);

  return (
    <ComponentProvider>
      <div
        onClick={e => {
          ComponentProvider.captureOutsideClick(e);
        }}
      >
        <Dropdown
          visible={visible}
          overlay={
            <List>
              <List.Item title="item1" />
              <List.Item
                title={<div style={{ color: "#006eff" }}>item2</div>}
              >
                <Icon name="check" color="#006eff" />
              </List.Item>
            </List>
          }
          onVisibleChange={visible => {
            setVisible(visible);
          }}
        >
          <Search onChange={value => setVisible(!!value)} />
        </Dropdown>
      </div>
    </ComponentProvider>
  );
}
