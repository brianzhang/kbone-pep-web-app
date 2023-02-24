import React, { useState } from "react";
import { pxTransform } from "@tarojs/taro";
import {
  Tabs,
  List,
  Picker,
  Switch,
  TabsProps,
  BadgeProps,
  IconProps,
} from "@tencent/tea-component-mobile";

const tabList: [string, string, BadgeProps, IconProps][] = [
  // id, label, badge, icon
  ["luohu", "罗湖区", null, { name: "location" }],
  ["futian", "福田区", null, { name: "location" }],
  ["nanshan", "南山区", { info: "99+" }, { name: "location" }],
  ["baoan", "宝安区", { info: "New" }, { name: "location" }],
  ["longgang", "龙岗区", null, { name: "location" }],
  ["longhua", "龙华区", null, { name: "location" }],
  ["pingshan", "坪山区", null, { name: "location" }],
  ["yantian", "盐田区", null, { name: "location" }],
  ["guangming", "光明区", null, { name: "location" }],
  ["dapeng", "大鹏新区", null, { name: "location" }],
];

export default function TabsExample() {
  const [placementIndex, setPlacementIndex] = useState(0);
  const placements = ["top", "bottom", "left", "right"];
  const placementTexts = ["顶部", "底部", "左侧", "右侧"];
  const placement = placements[placementIndex];

  const [swipeable, setSwipeable] = useState(true);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);

  const [directionIndex, setDirectionIndex] = useState(0);
  const directions = [
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ];
  const directionTexts = ["左右", "右左（反转）", "上下", "上下（反转）"];
  const direction = directions[directionIndex];

  return (
    <div className="page">
      <label className="header">Tabs 选项卡</label>
      <label className="header">基本用法</label>

      <Tabs>
        <Tabs.Tab key="1" id="1" label="选项一">
          <div style={{ padding: pxTransform(24, 750) }}>选项一内容</div>
        </Tabs.Tab>
        <Tabs.Tab key="2" id="2" label="选项二">
          <div style={{ padding: pxTransform(24, 750) }}>选项二内容</div>
        </Tabs.Tab>
      </Tabs>

      <label className="header" style={{ marginTop: "32px" }}>
        更多配置
      </label>

      <Tabs
        swipeable={swipeable}
        placement={placement}
        tabLayoutDirection={direction}
        allowVerticalSwipe
        swipeContentHeight={
          placement === "top" || placement === "bottom" ? 120 : undefined
        }
      >
        {tabList.map(([id, label, badge, icon]) => (
          <Tabs.Tab
            key={id}
            id={id}
            label={label}
            badge={badgeVisible && badge}
            icon={iconVisible && icon}
          >
            <div style={{ padding: pxTransform(24, 750) }}>{label}</div>
          </Tabs.Tab>
        ))}
      </Tabs>

      <List style={{ marginTop: "16px" }}>
        <Picker
          mode="selector"
          value={placementIndex}
          range={placements.map(
            (placement, index) => `${placementTexts[index]} (${placement})`
          )}
          onChange={value => setPlacementIndex(value)}
        >
          <List.Item arrow title="位置 (placement)">
            {placementTexts[placementIndex]} ({placement})
          </List.Item>
        </Picker>
        <List.Item title="可滑动切换 (swipeable)">
          <Switch
            checked={swipeable}
            onChange={checked => setSwipeable(checked)}
          />
        </List.Item>
        <List.Item title="徽章 (badge)">
          <Switch
            checked={badgeVisible}
            onChange={checked => setBadgeVisible(checked)}
          />
        </List.Item>
        <List.Item title="图标 (icon)">
          <Switch
            checked={iconVisible}
            onChange={checked => setIconVisible(checked)}
          />
        </List.Item>
        <Picker
          mode="selector"
          value={directionIndex}
          range={directions.map(
            (direction, index) => `${directionTexts[index]} (${direction})`
          )}
          onChange={value => setDirectionIndex(value)}
        >
          <List.Item arrow title="排列 (tabLayoutDirection)">
            {directionTexts[directionIndex]} ({direction})
          </List.Item>
        </Picker>
      </List>
    </div>
  );
}
