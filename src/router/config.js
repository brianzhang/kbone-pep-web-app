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
  { id: "index", path: '/', title: "?????? Button", component: Index },
  { id: "button", title: "?????? Button", component: Button },
  { id: "icon", title: "?????? Icon", component: ICon },
  { id: "typography", title: "?????? Typography", component: Typography },
  { id: "flex", title: "???????????? Flex", component: Flex },
  { id: "grid", title: "?????? Grid", component: Grid },
  { id: "level", title: "????????? Level", component: Level },
  { id: "white-space", title: "?????? WhitSpace", component: WhiteSpace },
  { id: "pagination", title: "?????? Pagination", component: Pagination },
  { id: "segmented-control", title: "????????? SegmentedControl", component: SegmentedControl },
  { id: "tabs", title: "????????? Tabs", component: Tabs },
  { id: "alert", title: "????????? Alert", component: Alert },
  { id: "badge", title: " ?????? Badge", component: Badge },
  { id: "card", title: "?????? Card", component: Card },
  { id: "cell", title: "??? Cell", component: Cell },
  { id: "collapse", title: "???????????? Collapse", component: Collapse },
  { id: "descriptions", title: "???????????? Descriptions", component: Descriptions },
  { id: "form", title: "?????? Form", component: Form },
  { id: "header-bar", title: "?????? HeaderBar", component: HeaderBar },
  { id: "list", title: "?????? List", component: List },
  { id: "progress", title: "????????? Progress", component: Progress },
  { id: "statistic", title: "???????????? Statistic", component: Statistic },
  { id: "steps", title: "????????? Steps", component: Steps },
  { id: "swiper", title: "???????????? Swiper", component: Swiper },
  { id: "table", title: "?????? Table", component: Table },
  { id: "tag", title: "?????? Tag", component: Tag },
  { id: "cascader", title: "???????????? Cascader", component: Cascader },
  { id: "checkbox", title: "????????? Checkbox", component: Checkbox },
  { id: "date-picker", title: "???????????? DatePicker", component: DatePicker },
  { id: "input", title: "????????? Input", component: Input },
  { id: "input-number", title: "???????????? InputNumber", component: InputNumber },
  { id: "picker", title: "????????? Picker", component: Picker },
  { id: "radio", title: "????????? Radio", component: Radio },
  { id: "rate", title: "?????? Rate", component: Rate },
  { id: "search", title: "?????? Search", component: Search },
  { id: "select", title: "????????? Select", component: Select },
  { id: "slider", title: "?????? Slider", component: Slider },
  { id: "switch", title: "?????? Switch", component: Switch },
  { id: "upload", title: "???????????? ImageUpload", component: ImageUpload },
  { id: "action-sheet", title: "???????????? ActionSheet", component: ActionSheet },
  { id: "dropdown", title: "?????? Dropdown", component: Dropdown },
  { id: "loading", title: "????????? Loading", component: Loading },
  { id: "message", title: "???????????? Message", component: Message },
  { id: "modal", title: "????????? Modal", component: Modal },
  { id: "popup", title: "????????? Popup", component: Popup },
  { id: "toast", title: "????????? Toast", component: Toast },
  { id: "list-view", title: "????????? ListView", component: ListView },
  { id: "result", title: "?????? Result", component: Result },
];
export default config

