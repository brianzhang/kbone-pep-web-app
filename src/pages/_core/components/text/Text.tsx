/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/text/text.tsx
 */
import React from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";

export interface TextProps extends StandardProps {
  /**
   * 是否可选中
   */
  selectable?: boolean;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(function Text(
  { selectable, className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={classNames(className, "tea-core-text", {
        "tea-core-text__selectable": selectable,
      })}
      {...props}
    />
  );
});
