import React from "react";
import { TypographyHeading } from "./Heading";
import { TypographyLink, TypographyText } from "./Text";

export function Typography({ children }) {
  return children;
}

Typography.Text = TypographyText;
Typography.Link = TypographyLink;
Typography.Heading = TypographyHeading;
