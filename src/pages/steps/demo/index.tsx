import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Steps, Button } from "@tencent/tea-component-mobile";

const steps = [
  {
    title: "基本信息",
    description: "步骤描述信息",
  },
  {
    title: "付款信息",
    description: (
      <div>
        <div>步骤描述信息</div>
        <div>步骤描述信息</div>
      </div>
    ),
  },
  { title: "线下汇款" },
  { title: "结果反馈" },
];

export default function StepsExample() {
  const [current, setCurrent] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const [current3, setCurrent3] = useState(0);
  return (
    <div className="page">
      <label className="header">Steps 步骤条</label>
      <label className="header">基本用法</label>
      <div className="section">
        <Steps steps={steps} current={current} />
        <Button.Group type="horizontal" style={{ marginTop: "16px" }}>
          <Button
            size="sm"
            disabled={current <= 0}
            onClick={() => setCurrent(c => c - 1)}
          >
            上一步
          </Button>
          <Button
            size="sm"
            type="primary"
            disabled={current >= 3}
            onClick={() => setCurrent(c => c + 1)}
          >
            下一步
          </Button>
        </Button.Group>
      </div>

      <label className="header">垂直步骤条</label>
      <div className="section">
        <Steps vertical steps={steps} current={current2} />
        <Button.Group type="horizontal" style={{ marginTop: "16px" }}>
          <Button
            size="sm"
            disabled={current2 <= 0}
            onClick={() => setCurrent2(c => c - 1)}
          >
            上一步
          </Button>
          <Button
            size="sm"
            type="primary"
            disabled={current2 >= 3}
            onClick={() => setCurrent2(c => c + 1)}
          >
            下一步
          </Button>
        </Button.Group>
      </div>

      <label className="header">只读步骤条</label>
      <div className="section">
        <Steps readonly steps={steps} />
      </div>

      <label className="header">点击切换</label>
      <div className="section">
        <Steps
          steps={steps}
          current={current3}
          onChange={c => setCurrent3(c)}
        />
      </div>
    </div>
  );
}
