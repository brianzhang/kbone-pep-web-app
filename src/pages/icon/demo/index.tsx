import React from "react";
import { View, Text } from "@tarojs/components";
import { Icon } from "@tencent/tea-component-mobile";
import "./index.less";

const iconsMap = [
  {
    icon: "nointernet",
    iconColor: "#C1C6C8",
    description: "nointernet",
  },
  {
    icon: "success",
    iconColor: "#29CC85",
    description: "success",
  },
  {
    icon: "warning",
    iconColor: "#FF584C",
    description: "warning",
  },
  {
    icon: "pending",
    iconColor: "#006EFF",
    description: "pending",
  },
  {
    icon: "refresh",
    iconColor: "#C1C6C8",
    description: "refresh",
  },
  {
    icon: "folder",
    iconColor: "#C1C6C8",
    description: "folder",
  },
  {
    icon: "arrowup",
    iconColor: "#444444",
    description: "arrowup",
  },
  {
    icon: "arrowdown",
    iconColor: "#444444",
    description: "arrowdown",
  },
  {
    icon: "arrowleft",
    iconColor: "#444444",
    description: "arrowleft",
  },
  {
    icon: "arrowright",
    iconColor: "#444444",
    description: "arrowright",
  },
  {
    icon: "chevronup",
    iconColor: "#444444",
    description: "chevronup",
  },
  {
    icon: "chevrondown",
    iconColor: "#444444",
    description: "chevrondown",
  },
  {
    icon: "chevronleft",
    iconColor: "#444444",
    description: "chevronleft",
  },
  {
    icon: "chevronright",
    iconColor: "#444444",
    description: "chevronright",
  },
  {
    icon: "delete",
    iconColor: "#444444",
    description: "delete",
  },
  {
    icon: "edit",
    iconColor: "#444444",
    description: "edit",
  },
  {
    icon: "search",
    iconColor: "#444444",
    description: "search",
  },
  {
    icon: "check",
    iconColor: "#006EFF",
    description: "check",
  },
  {
    icon: "close",
    iconColor: "#444444",
    description: "close",
  },
  {
    icon: "download",
    iconColor: "#444444",
    description: "download",
  },
  {
    icon: "success-fill",
    iconColor: "#29CC85",
    description: "success-fill",
  },
  {
    icon: "close-fill",
    iconColor: "#444444",
    description: "close-fill",
  },
  {
    icon: "minus-fill",
    iconColor: "#444444",
    description: "minus-fill",
  },
  {
    icon: "add-fill",
    iconColor: "#444444",
    description: "add-fill",
  },
  {
    icon: "info-fill",
    iconColor: "#006EFF",
    description: "info-fill",
  },
  {
    icon: "pending-fill",
    iconColor: "#006EFF",
    description: "pending-fill",
  },
  {
    icon: "warning-fill",
    iconColor: "#FF584C",
    description: "warning-fill",
  },
  {
    icon: "more",
    iconColor: "#444444",
    description: "more",
  },
  {
    icon: "star",
    iconColor: "#C1C6C8",
    description: "star",
  },
  {
    icon: "star-fill",
    iconColor: "#FF9C19",
    description: "star-fill",
  },
  {
    icon: "location",
    iconColor: "#444444",
    description: "location",
  },
  {
    icon: "question",
    iconColor: "#444444",
    description: "question",
  },
];

export default function IconExample() {
  return (
    <div className="page">
      <label className="header">Icon 图标</label>
      <div className="section">
        <label className="header">基本用法</label>
        <div className="icons-box">
          {iconsMap.map(icon => {
            return (
              <div key={icon.icon} className="icon-single">
                <Icon
                  color={icon.iconColor}
                  name={icon.icon}
                  onClick={() => {
                    console.log("Click!!!");
                  }}
                />
                <div className="icon-desc">{icon.icon}</div>
              </div>
            );
          })}
        </div>

        <label className="header">自定义图标</label>
        <div className="icons-box">
          <div className="icon-single">
            <Icon name="https://imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image.svg" />
            <div className="icon-desc">URL</div>
          </div>

          <div className="icon-single">
            <Icon name="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPue8lue7hCA2MDwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnqbrnmb3pobVQMS04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzExLjAwMDAwMCwgLTQ0OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC02MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzExLjAwMDAwMCwgNDQ4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IuepuueKtuaAgeWkh+S7vSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9ouWkh+S7vS00OSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEwLDQ1IEwxMjYsNDUgTDExMCwxMTIgTDQsMTEyIEw0LDE2IEwzOCwxNiBMNTUsMjYgTDExMCwyNiBMMTEwLDQ1IFogTTExLjYwMTU0ODcsMTA2IEwxMDUuMjY0MTIzLDEwNiBMMTE4LjM5ODQ1MSw1MSBMMjQuNzM1ODc3MSw1MSBMMTEuNjAxNTQ4NywxMDYgWiIgaWQ9IuW9oueKtiIgZmlsbD0iI0MxQzZDOCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbi3orabnpLoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwLjAwMDAwMCwgODAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9ouWkh+S7vS00NiIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2iIiBmaWxsPSIjRkZGRkZGIiBjeD0iMjgiIGN5PSIyNCIgcj0iMTciPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOCw0IEMzOS4wNDU2OTUsNCA0OCwxMi45NTQzMDUgNDgsMjQgQzQ4LDM1LjA0NTY5NSAzOS4wNDU2OTUsNDQgMjgsNDQgQzE2Ljk1NDMwNSw0NCA4LDM1LjA0NTY5NSA4LDI0IEM4LDEyLjk1NDMwNSAxNi45NTQzMDUsNCAyOCw0IFogTTMwLjMsMzAgTDI1LjcsMzAgTDI1LjcsMzUgTDMwLjMsMzUgTDMwLjMsMzAgWiBNMzAuMywxMyBMMjUuNywxMyBMMjUuNywyNiBMMzAuMywyNiBMMzAuMywxMyBaIiBpZD0i5aSx6LSlLeWRiuitpi3plJnor6/mj5DnpLrlpIfku70iIGZpbGw9IiMwMDZFRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" />
            <div className="icon-desc">Base64</div>
          </div>

          <div className="icon-single">
            <Icon
              render={({ size }) => <label style={{ fontSize: size }}>A</label>}
            />
            <div className="icon-desc">render</div>
          </div>
        </div>
      </div>
    </div>
  );
}
