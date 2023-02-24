import React from "react";
import { View, Text } from "@tarojs/components";
import { Icon, List, Checkbox, Switch } from "@tencent/tea-component-mobile";

export default function ListExample() {
  return (
    <div className="page">
      <label className="header">List 列表</label>
      <List title="基本用法">
        <List.Item title="标题文字">内容文字</List.Item>
        <List.Item title="标题文字" arrow onClick={() => null} />
        <List.Item title="标题文字" arrow onClick={() => null}>
          内容文字
        </List.Item>
        <List.Item title="标题文字" arrow onClick={() => null}>
          <Icon name="nointernet" />
        </List.Item>
        <List.Divider />
        <List.Item title="标题文字">
          <Switch defaultChecked />
        </List.Item>
        <List.Item title="标题文字">
          <Checkbox defaultChecked />
        </List.Item>
      </List>

      <List title="带描述的列表">
        <List.Item title="标题文字" description="说明文字">
          内容文字
        </List.Item>
        <List.Item
          title="标题文字"
          description="说明文字"
          arrow
          onClick={() => null}
        />
      </List>

      <List title="带前缀的列表（icon/before/thumb）">
        <List.Item title="标题文字" icon="success">
          内容文字
        </List.Item>
        <List.Item
          title="标题文字"
          description="说明文字"
          icon={{ name: "success", color: "#29cc85" }}
        >
          内容文字
        </List.Item>
        <List.Divider />
        <List.Item title="标题文字" before={<Checkbox defaultChecked />}>
          内容文字
        </List.Item>
        <List.Item title="标题文字" before={<Checkbox defaultChecked />}>
          内容文字
        </List.Item>
        <List.Divider />
        <List.Item
          title="标题文字"
          description="说明文字说明文字说明文字说明文字说明文字说明文字说明文字"
          thumb="//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image.svg"
        />
      </List>

      <List title="列表项大小">
        <List.Item
          title="标题文字标题文字标题文字标题文字标题文字"
          description="说明文字说明文字说明文字说明文字说明文字说明文字说明文字"
        >
          内容文字
        </List.Item>
        <List.Item
          size="auto"
          title="标题文字标题文字标题文字标题文字标题文字"
          description="说明文字说明文字说明文字说明文字说明文字说明文字说明文字"
        >
          内容文字
        </List.Item>
      </List>

      <List title="底部说明" footer="底部说明文字">
        <List.Item title="标题文字" description="说明文字">
          内容文字
        </List.Item>
      </List>
    </div>
  );
}
