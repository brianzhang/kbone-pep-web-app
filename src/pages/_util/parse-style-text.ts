import React from "react";

function convert(text: string) {
  const textList = text.split("");
  for (let i = 0; i < textList.length; i++) {
    if (textList[i] === "-") {
      textList.splice(i, 1);
      textList[i] = textList[i].toUpperCase();
    }
  }
  const str = textList.join();
  const strHump = str.replace(/,/g, "");
  return strHump;
}

export function parseStyleText(text: any): React.CSSProperties {
  if (typeof text === "string") {
    const style = {};
    text
      .split(";")
      .map(i => i.trim())
      .filter(Boolean)
      .forEach(pair => {
        const [key, value] = pair.split(":").map(i => i.trim());
        if (key && value) {
          style[convert(key)] = value;
        }
      });
    return style;
  }
  return text;
}
