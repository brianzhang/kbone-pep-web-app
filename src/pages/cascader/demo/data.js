export const data = [
  {
    label: "北京市",
    value: "bj",
    children: [
      { label: "朝阳区", value: "cy" },
      { label: "海淀区", value: "hd" },
    ],
  },
  {
    label: "上海市",
    value: "sh",
    children: [
      { label: "徐汇区", value: "xh" },
      { label: "黄埔区", value: "hp" },
    ],
  },
  {
    label: "广东省",
    value: "gd",
    children: [
      {
        label: "深圳市",
        value: "sz",
        children: [
          { label: "南山区", value: "ns" },
          { label: "宝安区", value: "ba" },
          { label: "福田区", value: "ft", disabled: true },
        ],
      },
    ],
  },
  {
    label: "山东省",
    value: "sd",
    children: [
      {
        label: "菏泽市",
        value: "hz",
        children: [{ label: "曹县", value: "cx" }],
      },
    ],
  },
];
