import React from "react";
import { navigateTo } from '../_util/taro-url.ts';
import "./index.less";

const config = [
  {
    title: "通用",
    components: [
      { id: "button", title: "按钮 Button" },
      { id: "icon", title: "图标 Icon" },
      { id: "typography", title: "排版 Typography" },
    ],
  },
  {
    title: "布局",
    components: [
      { id: "flex", title: "弹性布局 Flex" },
      { id: "grid", title: "宫格 Grid" },
      { id: "level", title: "端对齐 Level" },
      { id: "white-space", title: "留白 WhitSpace" },
    ],
  },
  {
    title: "导航",
    components: [
      { id: "pagination", title: "分页 Pagination" },
      { id: "segmented-control", title: "分段器 SegmentedControl" },
      { id: "tabs", title: "选项卡 Tabs" },
    ],
  },
  {
    title: "展示",
    components: [
      { id: "alert", title: "提示条 Alert" },
      { id: "badge", title: " 徽章 Badge" },
      { id: "card", title: "卡片 Card" },
      { id: "cell", title: "项 Cell" },
      { id: "collapse", title: "折叠面板 Collapse" },
      { id: "descriptions", title: "描述列表 Descriptions" },
      { id: "form", title: "表单 Form" },
      { id: "header-bar", title: "顶栏 HeaderBar" },
      { id: "list", title: "列表 List" },
      { id: "progress", title: "进度条 Progress" },
      { id: "statistic", title: "统计数值 Statistic" },
      { id: "steps", title: "步骤条 Steps" },
      { id: "swiper", title: "滑动视图 Swiper" },
      { id: "table", title: "表格 Table" },
      { id: "tag", title: "标签 Tag" },
    ],
  },
  {
    title: "表单",
    components: [
      { id: "cascader", title: "级联选择 Cascader" },
      { id: "checkbox", title: "复选框 Checkbox" },
      { id: "date-picker", title: "日期选择 DatePicker" },
      { id: "input", title: "输入框 Input" },
      { id: "input-number", title: "数字输入 InputNumber" },
      { id: "picker", title: "选择器 Picker" },
      { id: "radio", title: "单选框 Radio" },
      { id: "rate", title: "评分 Rate" },
      { id: "search", title: "搜索 Search" },
      { id: "select", title: "选择器 Select" },
      { id: "slider", title: "滑块 Slider" },
      { id: "switch", title: "开关 Switch" },
      { id: "upload", title: "图片上传 ImageUpload" },
    ],
  },
  {
    title: "反馈",
    components: [
      { id: "action-sheet", title: "动作面板 ActionSheet" },
      { id: "dropdown", title: "下拉 Dropdown" },
      { id: "loading", title: "加载中 Loading" },
      { id: "message", title: "消息通知 Message" },
      { id: "modal", title: "模态框 Modal" },
      { id: "popup", title: "弹出层 Popup" },
      { id: "toast", title: "轻提示 Toast" },
    ],
  },
  {
    title: "场景",
    components: [
      { id: "list-view", title: "长列表 ListView" },
      { id: "result", title: "结果 Result" },
    ],
  },
];

export default function Index() {
  return (
    <div className="index">
      <div className="logo">Tea</div>
      {config.map(({ title, components }) => (
        <div key={title}>
          <div className="header">{title}</div>
          {components.map(({ id, title }) => (
            <div
              key={id}
              className="item"
              onClick={() =>
                navigateTo({
                  url: `/${id}/demo/index`,
                })
              }
            >
              {title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
