import React, { lazy } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DocPage from './_doc/index.tsx';

const config = [
  {
    title: "通用",
    components: [
      { id: "button", title: "按钮 Button", component: lazy(() => import('./button/demo/index.tsx')) },
      { id: "icon", title: "图标 Icon", component: lazy(() => import('./icon/demo/index.tsx')) },
      { id: "typography", title: "排版 Typography", component: lazy(() => import('./typography/demo/index.tsx')) },
    ],
  },
  {
    title: "布局",
    components: [
      { id: "flex", title: "弹性布局 Flex", component: lazy(() => import('./flex/demo/index.tsx')) },
      { id: "grid", title: "宫格 Grid", component: lazy(() => import('./grid/demo/index.tsx')) },
      { id: "level", title: "端对齐 Level", component: lazy(() => import('./level/demo/index.tsx')) },
      { id: "white-space", title: "留白 WhitSpace", component: lazy(() => import('./white-space/demo/index.tsx')) },
    ],
  },
  {
    title: "导航",
    components: [
      { id: "pagination", title: "分页 Pagination", component: lazy(() => import('./pagination/demo/index.tsx')) },
      { id: "segmented-control", title: "分段器 SegmentedControl", component: lazy(() => import('./segmented-control/demo/index.tsx')) },
      { id: "tabs", title: "选项卡 Tabs", component: lazy(() => import('./tabs/demo/index.tsx')) },
    ],
  },
  {
    title: "展示",
    components: [
      { id: "alert", title: "提示条 Alert", component: lazy(() => import('./alert/demo/index.tsx')) },
      { id: "badge", title: " 徽章 Badge", component: lazy(() => import('./badge/demo/index.tsx')) },
      { id: "card", title: "卡片 Card", component: lazy(() => import('./card/demo/index.tsx')) },
      { id: "cell", title: "项 Cell", component: lazy(() => import('./cell/demo/index.tsx')) },
      { id: "collapse", title: "折叠面板 Collapse", component: lazy(() => import('./collapse/demo/index.tsx')) },
      { id: "descriptions", title: "描述列表 Descriptions", component: lazy(() => import('./descriptions/demo/index.tsx')) },
      { id: "form", title: "表单 Form", component: lazy(() => import('./form/demo/index.tsx')) },
      { id: "header-bar", title: "顶栏 HeaderBar", component: lazy(() => import('./header-bar/demo/index.tsx')) },
      { id: "list", title: "列表 List", component: lazy(() => import('./list/demo/index.tsx')) },
      { id: "progress", title: "进度条 Progress", component: lazy(() => import('./progress/demo/index.tsx')) },
      { id: "statistic", title: "统计数值 Statistic", component: lazy(() => import('./statistic/demo/index.tsx')) },
      { id: "steps", title: "步骤条 Steps", component: lazy(() => import('./steps/demo/index.tsx')) },
      { id: "swiper", title: "滑动视图 Swiper", component: lazy(() => import('./swiper/demo/index.tsx')) },
      { id: "table", title: "表格 Table", component: lazy(() => import('./table/demo/index.tsx')) },
      { id: "tag", title: "标签 Tag", component: lazy(() => import('./tag/demo/index.tsx')) },
    ],
  },
  {
    title: "表单",
    components: [
      { id: "cascader", title: "级联选择 Cascader", component: lazy(() => import('./cascader/demo/index.tsx')) },
      { id: "checkbox", title: "复选框 Checkbox", component: lazy(() => import('./checkbox/demo/index.tsx')) },
      { id: "date-picker", title: "日期选择 DatePicker", component: lazy(() => import('./date-picker/demo/index.tsx')) },
      { id: "input", title: "输入框 Input", component: lazy(() => import('./input/demo/index.tsx')) },
      { id: "input-number", title: "数字输入 InputNumber", component: lazy(() => import('./input-number/demo/index.tsx')) },
      { id: "picker", title: "选择器 Picker", component: lazy(() => import('./picker/demo/index.tsx')) },
      { id: "radio", title: "单选框 Radio", component: lazy(() => import('./radio/demo/index.tsx')) },
      { id: "rate", title: "评分 Rate", component: lazy(() => import('./rate/demo/index.tsx')) },
      { id: "search", title: "搜索 Search", component: lazy(() => import('./search/demo/index.tsx')) },
      { id: "select", title: "选择器 Select", component: lazy(() => import('./select/demo/index.tsx')) },
      { id: "slider", title: "滑块 Slider", component: lazy(() => import('./slider/demo/index.tsx')) },
      { id: "switch", title: "开关 Switch", component: lazy(() => import('./switch/demo/index.tsx')) },
      { id: "upload", title: "图片上传 ImageUpload", component: lazy(() => import('./upload/demo/index.tsx')) },
    ],
  },
  {
    title: "反馈",
    components: [
      { id: "action-sheet", title: "动作面板 ActionSheet", component: lazy(() => import('./action-sheet/demo/index.tsx')) },
      { id: "dropdown", title: "下拉 Dropdown", component: lazy(() => import('./dropdown/demo/index.tsx')) },
      { id: "loading", title: "加载中 Loading", component: lazy(() => import('./loading/demo/index.tsx')) },
      { id: "message", title: "消息通知 Message", component: lazy(() => import('./message/demo/index.tsx')) },
      { id: "modal", title: "模态框 Modal", component: lazy(() => import('./modal/demo/index.tsx')) },
      { id: "popup", title: "弹出层 Popup", component: lazy(() => import('./popup/demo/index.tsx')) },
      { id: "toast", title: "轻提示 Toast", component: lazy(() => import('./toast/demo/index.tsx')) },
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
const demoRouter = [];
config.forEach(i => {
  i.components.forEach(items => {
    demoRouter.push({
      path: `/${items.id}/demo/index`,
      component: items.component,
    })
  })
})

const RouteWithSubRoutes = route => {
  if (!route.path) return <Route component={DocPage} />
  return (<Route
    exact
    strict
    path={route.path}
    render={props => (
      route.redirect ?
        <Redirect push to={route.redirect} from={route.path}></Redirect> :
        <route.component {...props} routes={route.routes} />
    )}
  />)
}

export default function () {
  return (
    <Router>
      <Route path="/" component={DocPage} />
    </Router>
  );
}