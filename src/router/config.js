import React, { lazy } from 'react';
import Index from '../pages/_doc/index.tsx'

import Button from '../pages/button/demo/index.tsx';
import ICon from '../pages/icon/demo/index.tsx';
import Typography from '../pages/typography/demo/index.tsx'
import Flex from '../pages/flex/demo/index.tsx'
import Grid from '../pages/grid/demo/index.tsx';
import Level from '../pages/level/demo/index.tsx';
import WhiteSpace from '../pages/white-space/demo/index.tsx';
import Pagination from '../pages/pagination/demo/index.tsx';
import SegmentedControl from '../pages/segmented-control/demo/index.tsx';
import Tabs from '../pages/tabs/demo/index.tsx';
import Alert from '../pages/alert/demo/index.tsx';
import Badge from '../pages/badge/demo/index.tsx';
import Card from '../pages/card/demo/index.tsx';
import Cell from '../pages/cell/demo/index.tsx';
import Collapse from '../pages/collapse/demo/index.tsx';
import Descriptions from '../pages/descriptions/demo/index.tsx';
import Form from '../pages/form/demo/index.tsx';
import HeaderBar from '../pages/header-bar/demo/index.tsx';
import List from '../pages/list/demo/index.tsx';
import Progress from '../pages/progress/demo/index.tsx';
import Statistic from '../pages/statistic/demo/index.tsx'
import Steps from '../pages/steps/demo/index.tsx';
import Swiper from '../pages/swiper/demo/index.tsx';
import Table from '../pages/table/demo/index.tsx'
import Tag from '../pages/tag/demo/index.tsx'
import Cascader from '../pages/cascader/demo/index.tsx'
import Checkbox from '../pages/checkbox/demo/index.tsx'
import DatePicker from '../pages/date-picker/demo/index.tsx'
import Input from '../pages/input/demo/index.tsx'
import InputNumber from '../pages/input-number/demo/index.tsx'
import Picker from '../pages/picker/demo/index.tsx'
import Radio from '../pages/radio/demo/index.tsx'
import Rate from '../pages/rate/demo/index.tsx'
import Search from '../pages/search/demo/index.tsx'
import Select from '../pages/select/demo/index.tsx'
import Slider from '../pages/slider/demo/index.tsx'
import Switch from '../pages/switch/demo/index.tsx'
import ImageUpload from '../pages/upload/demo/index.tsx'
import ActionSheet from '../pages/action-sheet/demo/index.tsx'
import Dropdown from '../pages/dropdown/demo/index.tsx'
import Loading from '../pages/loading/demo/index.tsx'
import Message from '../pages/message/demo/index.tsx'
import Modal from '../pages/modal/demo/index.tsx'
import Popup from '../pages/popup/demo/index.tsx'
import Toast from '../pages/toast/demo/index.tsx'
import ListView from '../pages/list-view/demo/index.tsx'
import Result from '../pages/result/demo/index.tsx'
const config = [
  { id: "index", path: '/', title: "按钮 Button", component: Index },
  { id: "button", title: "按钮 Button", component: Button },
  { id: "icon", title: "图标 Icon", component: ICon },
  { id: "typography", title: "排版 Typography", component: Typography },
  { id: "flex", title: "弹性布局 Flex", component: Flex },
  { id: "grid", title: "宫格 Grid", component: Grid },
  { id: "level", title: "端对齐 Level", component: Level },
  { id: "white-space", title: "留白 WhitSpace", component: WhiteSpace },
  { id: "pagination", title: "分页 Pagination", component: Pagination },
  { id: "segmented-control", title: "分段器 SegmentedControl", component: SegmentedControl },
  { id: "tabs", title: "选项卡 Tabs", component: Tabs },
  { id: "alert", title: "提示条 Alert", component: Alert },
  { id: "badge", title: " 徽章 Badge", component: Badge },
  { id: "card", title: "卡片 Card", component: Card },
  { id: "cell", title: "项 Cell", component: Cell },
  { id: "collapse", title: "折叠面板 Collapse", component: Collapse },
  { id: "descriptions", title: "描述列表 Descriptions", component: Descriptions },
  { id: "form", title: "表单 Form", component: Form },
  { id: "header-bar", title: "顶栏 HeaderBar", component: HeaderBar },
  { id: "list", title: "列表 List", component: List },
  { id: "progress", title: "进度条 Progress", component: Progress },
  { id: "statistic", title: "统计数值 Statistic", component: Statistic },
  { id: "steps", title: "步骤条 Steps", component: Steps },
  { id: "swiper", title: "滑动视图 Swiper", component: Swiper },
  { id: "table", title: "表格 Table", component: Table },
  { id: "tag", title: "标签 Tag", component: Tag },
  { id: "cascader", title: "级联选择 Cascader", component: Cascader },
  { id: "checkbox", title: "复选框 Checkbox", component: Checkbox },
  { id: "date-picker", title: "日期选择 DatePicker", component: DatePicker },
  { id: "input", title: "输入框 Input", component: Input },
  { id: "input-number", title: "数字输入 InputNumber", component: InputNumber },
  { id: "picker", title: "选择器 Picker", component: Picker },
  { id: "radio", title: "单选框 Radio", component: Radio },
  { id: "rate", title: "评分 Rate", component: Rate },
  { id: "search", title: "搜索 Search", component: Search },
  { id: "select", title: "选择器 Select", component: Select },
  { id: "slider", title: "滑块 Slider", component: Slider },
  { id: "switch", title: "开关 Switch", component: Switch },
  { id: "upload", title: "图片上传 ImageUpload", component: ImageUpload },
  { id: "action-sheet", title: "动作面板 ActionSheet", component: ActionSheet },
  { id: "dropdown", title: "下拉 Dropdown", component: Dropdown },
  { id: "loading", title: "加载中 Loading", component: Loading },
  { id: "message", title: "消息通知 Message", component: Message },
  { id: "modal", title: "模态框 Modal", component: Modal },
  { id: "popup", title: "弹出层 Popup", component: Popup },
  { id: "toast", title: "轻提示 Toast", component: Toast },
  { id: "list-view", title: "长列表 ListView", component: ListView },
  { id: "result", title: "结果 Result", component: Result },
];
export default config
