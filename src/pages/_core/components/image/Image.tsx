/**
 * @see https://github.com/NervJS/taro/blob/next/packages/taro-components/src/components/text/text.tsx
 */
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { CommonEventFunction, StandardProps } from "../types/common";
import { mergeRefs } from "../../../_util/merge-refs";
import { noop } from "../../../_util/noop";
import { View } from "../view";
import { createEvent } from "../_util/create-event";

export type ImageMode =
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "widthFix"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export interface ImageProps extends StandardProps {
  /**
   * 图片资源地址
   */
  src: string;

  /** 图片裁剪、缩放的模式
   * @default "scaleToFill"
   */
  mode?: ImageMode;

  /**
   * 加载异常回调
   */
  onError?: CommonEventFunction;

  /**
   * 加载完成回调
   */
  onLoad?: CommonEventFunction;

  /**
   * 为 img 标签额外增加的属性
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image(
    {
      src,
      mode = "scaleToFill",
      onLoad = noop,
      onError = noop,
      className,
      ...props
    },
    ref
  ) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [aspectFillMode, setAspectFillMode] = useState<"width" | "height">(
      "width"
    );

    function handleLoad(event) {
      const { width, height, naturalWidth, naturalHeight } = imgRef.current;
      onLoad(
        createEvent(event, {
          width,
          height,
        })
      );
      setAspectFillMode(naturalWidth > naturalHeight ? "width" : "height");
    }

    return (
      <div className={classNames(className, "tea-core-image")} {...props}>
        <img
          alt=""
          ref={mergeRefs(ref, imgRef)}
          src={src}
          className={classNames(
            `tea-core-image__mode-${mode.toLowerCase().replace(/\s/g, "")}`,
            {
              [`tea-core-image__mode-aspectfill--${aspectFillMode}`]:
                mode === "aspectFill",
            }
          )}
          onLoad={handleLoad}
          onError={onError}
        />
      </div>
    );
  }
);
