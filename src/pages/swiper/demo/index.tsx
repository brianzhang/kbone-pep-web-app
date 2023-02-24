import React, { useCallback, useState } from "react";
import { Swiper, List, Switch } from "@tencent/tea-component-mobile";
import classNames from "classnames";
import "./index.less";

export default function SwiperExample() {
  const [circular, setCircular] = useState(true);
  const [indicator, setIndicator] = useState(false);
  const [indicatorDots, setIndicatorDots] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [vertical, setVertical] = useState(false);

  const customIndicator = useCallback(
    (current, total) => (
      <div className="demo-indicator">
        {Array(total)
          .fill(null)
          .map((_, index) => (
            <div 
              key={index}
              className={classNames("demo-indicator-dot", {
                current: current === index,
              })}
            />
          ))}
      </div>
    ),
    []
  );

  return (
    <div className="page">
      <label className="header">Swiper 滑动视图</label>
      <Swiper
        circular={circular}
        indicatorDots={indicatorDots}
        indicator={indicator ? customIndicator : undefined}
        autoplay={autoplay}
        vertical={vertical}
        onChange={index => console.log(`onChange ${index}`)}
      >
        <Swiper.Item onClick={() => console.log(0)}>
          <img
            src="https://via.placeholder.com/650x300/FFB5B5/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Swiper.Item>
        <Swiper.Item onClick={() => console.log(1)}>
          <img
            src="https://via.placeholder.com/650x300/A2E1D4/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Swiper.Item>
        <Swiper.Item onClick={() => console.log(2)}>
          <img
            src="https://via.placeholder.com/650x300/D0D0D0/656565?text=Tea"
            style={{ width: "100%", height: "100%" }}
          />
        </Swiper.Item>
      </Swiper>

      <List title="属性配置">
        <List.Item title="展示指示点">
          <Switch
            checked={indicatorDots}
            onChange={value => setIndicatorDots(value)}
          />
        </List.Item>
        <List.Item title="循环滚动">
          <Switch checked={circular} onChange={value => setCircular(value)} />
        </List.Item>
        <List.Item title="自动播放">
          <Switch checked={autoplay} onChange={value => setAutoplay(value)} />
        </List.Item>
        <List.Item title="纵向滚动">
          <Switch checked={vertical} onChange={value => setVertical(value)} />
        </List.Item>
        <List.Item title="自定义指示器">
          <Switch checked={indicator} onChange={value => setIndicator(value)} />
        </List.Item>
      </List>

      <label className="header">前后边距</label>
      <Swiper indicatorDots previousMargin={24} nextMargin={24}>
        <Swiper.Item onClick={() => console.log(0)}>
          <img
            src="https://via.placeholder.com/500x300/FFB5B5/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "0 8px",
            }}
          />
        </Swiper.Item>
        <Swiper.Item onClick={() => console.log(1)}>
          <img
            src="https://via.placeholder.com/500x300/A2E1D4/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "0 8px",
            }}
          />
        </Swiper.Item>
        <Swiper.Item onClick={() => console.log(2)}>
          <img
            src="https://via.placeholder.com/500x300/D0D0D0/656565?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "0 8px",
            }}
          />
        </Swiper.Item>
      </Swiper>

      <label className="header">内边距</label>
      <Swiper circular indicatorDots style={{ background: "#fdf9ee" }}>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/950x300/FFB5B5/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "32px",
            }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/950x300/A2E1D4/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "32px",
            }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/950x300/D0D0D0/656565?text=Tea"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "32px",
            }}
          />
        </Swiper.Item>
      </Swiper>

      <label className="header">同页多滑块</label>
      <Swiper displayMultipleItems={3} circular>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/350x300/FFB5B5/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/350x300/A2E1D4/fffaf4?text=Tea"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/360x300/D0D0D0/656565?text=Tea"
            style={{ width: "100%", height: "100%" }}
          />
        </Swiper.Item>
        <Swiper.Item>
          <img
            src="https://via.placeholder.com/360x300/fffaaa/656565?text=Tea"
            style={{ width: "100%", height: "100%" }}
          />
        </Swiper.Item>
      </Swiper>
    </div>
  );
}
