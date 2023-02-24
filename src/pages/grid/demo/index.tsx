import React from "react";
import { View, Text } from "@tarojs/components";
import { Grid } from "@tencent/tea-component-mobile";

export default function GridExample() {
  const data = [
    {
      icon:
        "//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image-s.svg",
      title: "标题文字",
      description: "描述文字",
    },
    {
      icon:
        "//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image-s.svg",
      title: "标题文字",
      description: "描述文字",
    },
    {
      icon: { name: "star-fill", color: "pink" },
      title: "标题文字",
      description: "描述文字",
    },
  ];
  return (
    <div className="page">
      <label className="header">Grid 宫格</label>

      <label className="header">基本用法</label>
      <Grid data={data} onClick={console.log} />

      <label className="header">指定每列宫格元素数量</label>
      <Grid
        data={[
          ...data,
          {
            icon: { name: "star-fill", color: "#ff9c19" },
            title: "标题文字",
            description: "描述文字",
          },
        ]}
        columnNum={4}
        onClick={console.log}
      />

      <label className="header">正方形宫格</label>
      <Grid data={data} square onClick={console.log} />

      <label className="header">指定宫格元素间距</label>
      <Grid data={data} gutter={10} onClick={console.log} />

      <label className="header">不显示边框</label>
      <Grid data={data} bordered={false} onClick={console.log} />
    </div>
  );
}
