import React, { useMemo } from "react";
import { forwardRefWithStatics } from "../_util/forward-ref-with-statics";

// 颜色枚举，1 ～ 14
export enum Color {
  Blue = 1,
  SkyBlue,
  Turquoise,
  Green,
  Purple,
  Pink,
  Orange,
  LightBlue,
  LightSkyBlue,
  LightTurquoise,
  LightGreen,
  LightPurple,
  LightPink,
  LightOrange,
}

// 颜色值
const ColorMap = {
  [Color.Blue]: "#2670E8",
  [Color.SkyBlue]: "#2985C7",
  [Color.Turquoise]: "#27B3BC",
  [Color.Green]: "#29C770",
  [Color.Purple]: "#A846FF",
  [Color.Pink]: "#E85C5C",
  [Color.Orange]: "#FF8420",
  [Color.LightBlue]: "#96BBF8",
  [Color.LightSkyBlue]: "#80CAFF",
  [Color.LightTurquoise]: "#85D9DF",
  [Color.LightGreen]: "#85DFAD",
  [Color.LightPurple]: "#CE96FF",
  [Color.LightPink]: "#F2A2A2",
  [Color.LightOrange]: "#FFB980",
};

// 文案颜色
enum TextColor {
  Light = "#ffffff",
  Dark = "#000000",
}

// 文案亮色对应的列表
const LightTextColors = [
  Color.Blue,
  Color.SkyBlue,
  Color.Turquoise,
  Color.Green,
  Color.Purple,
  Color.Pink,
  Color.Orange,
];
// 文案暗色对应的列表
const DarkTextColors = [
  Color.LightBlue,
  Color.LightSkyBlue,
  Color.LightTurquoise,
  Color.LightGreen,
  Color.LightPurple,
  Color.LightPink,
  Color.LightOrange,
];

export interface AvatarProps {
  /**
   * 头像文案
   */
  text: string;
  /**
   * 头像颜色
   *
   * -  如果是 `Color` 枚举，直接对应颜色模板
   * -  如果是颜色字符串(支持Hex和rgb(a))，则使用传入的颜色
   * -  其他字符串输入(比如腾讯云 uin)，采取哈希到 `Color` 枚举值后再取模板颜色
   */
  color: Color | string;
  /**
   * 文案颜色
   *
   * -  一般不需要修改。自定义颜色时可以根据自身需求调整
   *
   */
  textColor?: string;
  /**
   * 头像宽度
   *
   * @default 38
   */
  width?: number;
  /**
   * 头像高度
   *
   * @default 38
   */
  height?: number;
  /**
   * 显示提示徽章
   *
   * @default false
   */
  badge?: boolean;
}

export const Avatar = forwardRefWithStatics(
  function Avatar(
    {
      width = 38,
      height = 38,
      color,
      text,
      textColor: textColorProp,
      badge,
    }: AvatarProps,
    ref: React.Ref<SVGSVGElement>
  ) {
    const [textColor, backColor] = useMemo(() => {
      let textColor = TextColor.Light;
      let backColor = ColorMap[Color.Blue];
      if (typeof color === "number" && ColorMap[color]) {
        backColor = ColorMap[color];
        if (DarkTextColors.includes(color)) {
          textColor = TextColor.Dark;
        }
        if (LightTextColors.includes(color)) {
          textColor = TextColor.Light;
        }
      }
      if (typeof color === "string") {
        if (/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$|^rgb/.test(color)) {
          backColor = color;
        } else {
          // 字符串哈希
          let hash = 5381;
          for (let i = 0, len = color.length; i < len; ++i) {
            hash += (hash << 5) + color.charCodeAt(i);
          }
          // 模除 14
          const colorNum = Math.abs(hash % 14) + 1;
          backColor = ColorMap[colorNum];
          if (DarkTextColors.includes(colorNum)) {
            textColor = TextColor.Dark;
          }
          if (LightTextColors.includes(colorNum)) {
            textColor = TextColor.Light;
          }
        }
      }

      return [textColorProp || textColor, backColor];
    }, [color, textColorProp]);

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* 背景色配置处 */}
          <rect x="1" y="1" width="36" height="36" rx="18" fill={backColor} />
          {/* 文本配制处 */}
          <text
            fill={textColor}
            x="18.5"
            y="25.5"
            style={{ textAnchor: "middle" }}
            fontFamily="PingFang SC"
            fontSize="18"
            fontWeight="500"
          >
            {text}
          </label>
        </g>
        {/* 红点 */}
        {badge && <circle cx="34" cy="10" r="4" fill="#F64041" />}
      </svg>
    );
  },
  { Color }
);
