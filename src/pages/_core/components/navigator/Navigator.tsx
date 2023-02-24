/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/navigator/navigator.tsx
 */
import React from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";

export interface NavigatorProps extends StandardProps {}

export const Navigator = React.forwardRef<HTMLAnchorElement, NavigatorProps>(
  function Navigator({ className, children, ...props }, ref) {
    return (
      <a ref={ref} className={classNames(className)} {...props}>
        {children}
      </a>
    );
  }
);
