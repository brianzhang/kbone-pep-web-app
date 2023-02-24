import React, { useRef, useState } from "react";
import classNames from "classnames";
import { uploadFile, chooseImage } from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { injectValue } from "../_util/inject-value";
import { noop } from "../_util/noop";
import { useConfig } from "../_util/use-config";
import { CommonProps, StyledProps } from "../_type";
import { Icon } from "../icon";
import { Loading } from "../loading";
import { TypographyText } from "../typography/Text";
import { TaroEnv } from "../_util/env";

export interface ImageUploadProps extends StyledProps {
  /**
   * 服务器地址
   */
  url: string;

  /**
   * 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
   * @supported h5
   */
  name?: string;

  /**
   * HTTP 请求 Header，Header 中不能设置 Referer
   */
  header?: Record<string, any>;

  /**
   * HTTP 请求中其他额外的 form data
   */
  formData?: Record<string, any>;

  /**
   * 超时时间，单位为毫秒
   */
  timeout?: number;

  /**
   * 上传的文件名
   */
  fileName?: string;

  /**
   * 上传文件前调用
   *
   * 返回 `false` 终止当前上传流程
   */
  beforeUpload?: (file: ImageFile) => void | boolean;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  onComplete?: () => void;

  /**
   * 接口调用失败的回调函数
   */
  onFail?: (res: { errMsg: string }) => void;

  /**
   * 接口调用成功的回调函数
   */
  onSuccess?: (result: {
    data: string;
    statusCode: number;
    errMsg: string;
  }) => void;

  /**
   * 提示
   */
  tips?: React.ReactNode;

  /**
   * 受控的上传组件状态展示
   *
   * 可配合 `beforeUpload` 实现自定义上传
   */
  status?: "uploading" | "error";

  /**
   * 已上传的图片 URL
   */
  image?: string;

  /**
   * 触发区域背景图 URL
   */
  backgroundImage?: string;

  /**
   * 是否为只读形式
   */
  readonly?: boolean;

  /**
   * 自定义触发区域
   */
  children?:
    | React.ReactNode
    | ((state: { loading: boolean }) => React.ReactNode);
}

export interface ImageFile {
  /**
   * 本地临时文件路径
   */
  path: string;

  /**
   * 本地临时文件大小，单位 B
   */
  size: number;

  /**
   * 文件的 MIME 类型
   * @supported h5
   */
  type?: string;

  /**
   * 原始的浏览器 File 对象
   * @supported h5
   */
  originalFileObj?: File;
}

// function getImageBase64(file: ImageFile, callback: (url: string) => void) {
//   if (TaroEnv === "weapp") {
//     getFileSystemManager().readFile({
//       filePath: file.path,
//       success: (res: any) => {
//         const fileBuffer = res.data;
//         callback(arrayBufferToBase64(fileBuffer));
//       },
//     });
//   } else if (file.originalFileObj) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       console.log(reader.result);
//       callback(reader.result as string);
//     };
//     reader.readAsDataURL(file.originalFileObj);
//   }
// }

function DefaultPicker({
  image,
  backgroundImage,
  loading,
  error,
  readonly,
}: Partial<ImageUploadProps> & { loading: boolean; error: boolean }) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-image-upload__picker`, {
        [`${classPrefix}-image-upload__picker-default`]:
          !image && !backgroundImage,
      })}
    >
      {!!image && (
        <Image
          className={`${classPrefix}-image-upload__image`}
          src={image}
          mode="widthFix"
          style={{
            height: TaroEnv === "weapp" ? "" : "auto",
            width: "100%",
          }}
        />
      )}
      {!image && !!backgroundImage && (
        <div className={`${classPrefix}-image-upload__background`}>
          <Image
            src={backgroundImage}
            mode="widthFix"
            style={{
              height: TaroEnv === "weapp" ? "" : "auto",
              width: "100%",
            }}
            className={`${classPrefix}-image-upload__image`}
          />
        </div>
      )}
      {!image && !backgroundImage && (
        <div className={`${classPrefix}-image-upload__placeholder`} />
      )}
      {!image && !readonly && (
        <div>
          {!loading ? (
            <Icon
              className={`${classPrefix}-image-upload__icon`}
              name={error ? "warning-fill" : "add-fill"}
              color={error ? "#FF584C" : "#006EFF"}
            />
          ) : (
            <Loading
              className={`${classPrefix}-image-upload__icon`}
              color="#006EFF"
            />
          )}
        </div>
      )}
    </div>
  );
}

export function ImageUpload({
  url,
  name = "image",
  children,
  onComplete = noop,
  onFail = noop,
  onSuccess = noop,
  beforeUpload = noop,
  image,
  backgroundImage,
  tips,
  readonly,
  status,
  className,
  style,
  ...props
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [curImage, setCurImage] = useState<string>();
  const taskRef = useRef<ReturnType<typeof uploadFile>>(null);

  const { classPrefix } = useConfig();

  return (
    <div 
      className={classNames(`${classPrefix}-image-upload`, className)}
      style={style}
      onClick={() => {
        if (readonly) {
          return;
        }

        chooseImage({
          count: 1,
          success: ({ tempFiles }) => {
            const file = tempFiles[0];
            if (!file || beforeUpload(file) === false) {
              return;
            }

            setLoading(true);
            setError(false);
            // setCurImage(undefined);
            taskRef.current = uploadFile({
              url,
              name,
              filePath: file.path,
              complete: () => {
                setLoading(false);
                onComplete();
              },
              fail: (...args) => {
                setError(true);
                onFail(...args);
              },
              success: (...args) => {
                // getImageBase64(file, url => {
                //   setCurImage(url);
                // });
                onSuccess(...args);
              },
              ...props,
            });
          },
        });
      }}
    >
      {children ? (
        injectValue(children)({ loading })
      ) : (
        <DefaultPicker
          image={image}
          backgroundImage={backgroundImage}
          loading={status === "uploading" || loading}
          error={status === "error" || error}
          readonly={readonly}
        />
      )}
      <TypographyText
        block
        className={`${classPrefix}-image-upload__tips`}
        theme="light"
        size="xs"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {tips}
      </TypographyText>
    </div>
  );
}

function ImageUploadGroup({ className, ...props }: CommonProps) {
  const { classPrefix } = useConfig();
  return (
    <div 
      className={classNames(`${classPrefix}-image-upload__group`, className)}
      {...props}
    />
  );
}

ImageUpload.Group = ImageUploadGroup;
