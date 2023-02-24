import React from "react";
import { View, Text } from "@tarojs/components";
import { Avatar } from "@tencent/tea-component-mobile";

export default function AvatarExample() {
  return (
    <div className="page">
      <label className="header">Avatar 头像</label>
      <div className="section">
        <Avatar color={Avatar.Color.Blue} text="T" />
        <Avatar color={Avatar.Color.SkyBlue} text="T" />
        <Avatar color={Avatar.Color.Turquoise} text="T" />
        <Avatar color={Avatar.Color.Green} text="T" />
        <Avatar color={Avatar.Color.Purple} text="T" />
        <Avatar color={Avatar.Color.Pink} text="T" />
        <Avatar color={Avatar.Color.Orange} text="T" />
        <Avatar color={Avatar.Color.LightBlue} text="T" />
        <Avatar color={Avatar.Color.LightSkyBlue} text="T" />
        <Avatar color={Avatar.Color.LightTurquoise} text="T" />
        <Avatar color={Avatar.Color.LightGreen} text="T" />
        <Avatar color={Avatar.Color.LightPurple} text="T" />
        <Avatar color={Avatar.Color.LightPink} text="T" />
        <Avatar color={Avatar.Color.LightOrange} text="T" />
        <Avatar color="#000000" text="T" />
        <Avatar color="100013414624" text="T" badge />
        <Avatar color="100033414613" text="T" />
      </div>
    </div>
  );
}
