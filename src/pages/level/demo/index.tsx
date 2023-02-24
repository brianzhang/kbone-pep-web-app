import React from "react";
import { View, Text, Image } from "@tarojs/components";
import { Level } from "@tencent/tea-component-mobile";
import "./index.less";

export default function LevelExample() {
  return (
    <div className="page">
      <label className="header">Level 端对齐</label>

      <label className="header">单个元素默认于容器水平垂直居中</label>
      <div className="demo-box">
        <div className="wrap bor">
          <Level className="demo">
            <div className="imageWrap bor">
              <Image src="//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/tea-ui.svg" />
            </div>
          </Level>
        </div>
      </div>

      <label className="header">左右两端对齐</label>
      <div className="demo-box">
        <div className="wrap bor">
          <Level
            start={
              <div>
                <div className="title bor">机械键盘</div>
                <div className="meta bor">￥1000</div>
              </div>
            }
            end={<div className="details bor">已售100</div>}
          />
        </div>
      </div>

      <label className="header">左侧内容宽度固定，右侧内容占据剩余空间</label>
      <div className="demo-box">
        <div className="wrap bor">
          <Level
            startWidth={160}
            endFlex="1"
            start={<div className="title bor">你的身份证号码</div>}
            end={<div className="details bor">123456789012345678</div>}
          />
        </div>
      </div>

      <label className="header">右侧宽度固定，左侧内容占据剩余空间</label>
      <div className="demo-box">
        <div className="wrap bor">
          <Level
            endWidth={160}
            startFlex="1"
            start={<div className="title bor">吃葡萄不吐葡萄皮</div>}
            end={<div className="details bor">不吃葡萄倒吐葡萄皮</div>}
          />
        </div>
      </div>
    </div>
  );
}
