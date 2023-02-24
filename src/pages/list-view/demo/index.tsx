import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import {
  ListView,
  List,
  SegmentedControl,
  Loading,
} from "@tencent/tea-component-mobile";
import "./index.less";

const itemData = Array(1000)
  .fill(null)
  .map((_, index) => ({
    id: index,
    text: `Item ${index}`,
  }));

export default function ListViewExample() {
  const [mode, setMode] = useState(0);

  const [data, setData] = useState(
    Array(20)
      .fill(null)
      .map((_, index) => ({
        id: index,
        text: `Item ${index}`,
      }))
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <div className="page">
      <label className="header">ListView 长列表</label>
      <SegmentedControl
        values={["固定高度", "底部加载", "跟随页面"]}
        value={mode}
        onChange={mode => setMode(mode)}
      />

      {mode === 0 && (
        <ListView
          height={500}
          itemSize={64}
          itemData={itemData}
          itemKey={data => data.id}
          itemRender={({ index, style, data, isScrolling }) => (
            <List.Item
              title={data.id}
              style={{ ...style, marginTop: 0 }}
              description={data.text}
            />
          )}
        />
      )}

      {mode === 1 && (
        <ListView
          height={500}
          itemSize={64}
          itemData={data}
          itemKey={data => data.id}
          itemRender={({ index, style, data, isScrolling }) => (
            <List.Item
              title={data.id}
              style={{ ...style, marginTop: 0 }}
              description={data.text}
            />
          )}
          onScrollBottom={() => {
            if (!loading) {
              setLoading(true);
              setTimeout(() => {
                setData(data => [
                  ...data,
                  ...Array(20)
                    .fill(null)
                    .map((_, index) => ({
                      id: index + data.length,
                      text: `Item ${index + data.length}`,
                    })),
                ]);
              }, 1000);
            }
          }}
          footer={
            loading && (
              <div className="demo-loading">
                <Loading>加载中 ...</Loading>
              </div>
            )
          }
        />
      )}

      {mode === 2 && (
        <div>
          <div
            className="header"
            style={{
              textAlign: "center",
              position: "sticky",
              top: 0,
              backgroundColor: "#ddd",
              zIndex: 1,
            }}
          >
            Taro 暂不支持该特性
          </div>
          <ListView
            usePageScroll
            itemSize={64}
            itemData={itemData}
            itemKey={data => data.id}
            itemRender={({ index, style, data, isScrolling }) => (
              <List.Item
                title={data.id}
                style={{ ...style, marginTop: 0 }}
                description={data.text}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}
