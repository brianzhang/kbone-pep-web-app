interface CallbackResult {
  /**
   * 错误信息
   */
  errMsg: string;
}

export interface UploadFileOption {
  /**
   * 开发者服务器地址
   */
  url: string;

  /**
   * 要上传文件资源的路径
   */
  filePath: string;

  /**
   * 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
   */
  name: string;

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
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail?: (res: CallbackResult) => void;

  /**
   * 接口调用成功的回调函数
   */
  success?: (result: UploadSuccessCallbackResult) => void;
}

interface UploadSuccessCallbackResult extends CallbackResult {
  /**
   * 开发者服务器返回的数据
   */
  data: string;

  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;

  /**
   * 调用结果
   */
  errMsg: string;
}

export interface UploadTask {
  /**
   * HTTP Response Header 事件的回调函数
   */
  OffHeadersReceivedCallback: (res: CallbackResult) => void;

  /**
   * 上传进度变化事件的回调函数
   */
  OffProgressUpdateCallback: (res: CallbackResult) => void;

  /**
   * HTTP Response Header 事件的回调函数
   */
  OnHeadersReceivedCallback: (result: OnHeadersReceivedCallbackResult) => void;

  /**
   * 上传进度变化事件的回调函数
   */
  OnProgressUpdateCallback: (result: OnProgressUpdateCallbackResult) => void;
}

interface OnHeadersReceivedCallbackResult {
  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: Record<string, any>;
}

interface OnProgressUpdateCallbackResult {
  /**
   * 上传进度百分比
   */
  progress: number;

  /**
   * 预期需要上传的数据总长度，单位 Bytes
   */
  totalBytesExpectedToSend: number;

  /**
   * 已经上传的数据长度，单位 Bytes
   */
  totalBytesSent: number;
}

export interface ChooseImageOption {
  /**
   * 最多可以选择的图片张数
   */
  count?: number;

  /**
   * 所选的图片的尺寸
   */
  sizeType?: Array<keyof SizeType>;

  /**
   * 选择图片的来源
   */
  sourceType?: Array<keyof SourceType>;

  /**
   * 接口调用失败的回调函数
   */
  fail?: (res: CallbackResult) => void;

  /**
   * 接口调用成功的回调函数
   */
  success?: (result: ChooseImageSuccessCallbackResult) => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (res: CallbackResult) => void;

  /**
   * 用来上传的 input 元素 ID
   * @supported h5
   */
  imageId?: string;
}

/**
 * 图片的尺寸
 */
export interface SizeType {
  /**
   * 原图
   */
  original;

  /**
   * compressed
   */
  compressed;
}

/**
 * 图片的来源
 */
export interface SourceType {
  /**
   * 从相册选图
   */
  album;

  /**
   * 使用相机
   */
  camera;

  /**
   * 使用前置摄像头 (仅H5纯浏览器使用)
   */
  user;

  /**
   * 使用后置摄像头 仅H5纯浏览器)
   */
  environment;
}

export interface ChooseImageSuccessCallbackResult extends CallbackResult {
  /**
   * 图片的本地临时文件路径列表
   */
  tempFilePaths: string[];

  /**
   * 图片的本地临时文件列表
   */
  tempFiles: ImageFile[];

  /**
   * 调用结果
   */
  errMsg: string;
}

/**
 * 图片的本地临时文件列表
 */
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
