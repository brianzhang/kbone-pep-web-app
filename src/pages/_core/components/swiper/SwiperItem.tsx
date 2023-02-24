/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/swiper-item/swiper-item.tsx
 */
import React from "react";
import classNames from "classnames";
import { StandardProps } from "../types/common";

export interface SwiperItemProps extends StandardProps {}

export const SwiperItem = React.forwardRef<HTMLDivElement, SwiperItemProps>(
  function SwiperItem({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={classNames("swiper-slide", className)}
        {...props}
      />
    );
  }
);
