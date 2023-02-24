/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/label/label.tsx
 */
import React from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";

export interface LabelProps extends StandardProps {
  for?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ for: htmlFor, className, ...props }, ref) {
    return (
      <label
        htmlFor={htmlFor}
        ref={ref}
        className={classNames(className)}
        {...props}
      />
    );
  }
);
