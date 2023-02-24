import React, { useState } from "react";
import classNames from "classnames";
import { View } from "@tarojs/components";
import { StyledProps } from "../_type";
import { Popup, PopupProps } from "../popup";
import { Col, Row } from "../flex";
import { Button, ButtonProps } from "../button";
import { noop } from "../_util/noop";
import { modalEmitter } from "./ModalManager";
import { useTranslation } from "../config-provider/i18n";
import { useConfig } from "../_util/use-config";

export interface ModalShowOptions
  extends Pick<PopupProps, "mask" | "onClose" | "zIndex"> {
  /**
   * 提示的标题
   */
  title?: React.ReactNode;

  /**
   * 提示的内容
   */
  content?: React.ReactNode;

  /**
   * 确认按钮的文字，最多 4 个字符
   * @default "确定"
   */
  confirmText?: React.ReactNode;

  /**
   * 自定义确认按钮属性
   */
  confirmButtonProps?: ButtonProps;

  /**
   * 点击确认按钮的回调函数
   */
  onConfirm?: () => Promise<void> | void;

  /**
   * 模态框关闭的回调函数
   */
  onClose?: () => void;

  /**
   * 是否隐藏取消按钮
   * @default false
   */
  hideCancel?: boolean;

  /**
   * 取消按钮的文字，最多 4 个字符
   * @default "取消"
   */
  cancelText?: React.ReactNode;

  /**
   * 自定义取消按钮属性
   */
  cancelButtonProps?: ButtonProps;

  /**
   * 点击取消按钮的回调函数
   */
  onCancel?: () => Promise<void> | void;

  /**
   * 点击蒙层是否关闭模态框
   * @default false
   */
  maskClosable?: boolean;
}

export interface ModalProps
  extends Pick<PopupProps, "visible" | "destroyOnClose" | "onVisibleChange">,
    ModalShowOptions,
    StyledProps {
  // children?: React.ReactNode;
}

export function Modal({
  visible,
  onVisibleChange,
  mask,
  maskClosable = false,
  destroyOnClose,
  onClose = noop,
  title,
  content,
  hideCancel,
  cancelText,
  confirmText,
  confirmButtonProps = {},
  cancelButtonProps = {},
  onCancel = noop,
  onConfirm = noop,
  zIndex,
  // children,
  className,
  style,
}: ModalProps) {
  const t = useTranslation();
  const { classPrefix } = useConfig();
  const [cancelLoading, setCancelLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  async function handleCancel(event) {
    event.stopPropagation();
    try {
      setCancelLoading(true);
      await onCancel();
      setCancelLoading(false);
      onClose();
      onVisibleChange(false);
    } catch (_) {
      setCancelLoading(false);
    }
  }

  async function handleConfirm(event) {
    event.stopPropagation();
    try {
      setConfirmLoading(true);
      await onConfirm();
      setConfirmLoading(false);
      onClose();
      onVisibleChange(false);
    } catch (_) {
      setConfirmLoading(false);
    }
  }

  return (
    <Popup
      position="center"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onClose={onClose}
      mask={mask}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      zIndex={zIndex}
      overlay={
        <div 
          className={classNames(`${classPrefix}-modal`, className)}
          style={style}
          onClick={e => e.stopPropagation()}
        >
          <div className={`${classPrefix}-modal-inner`}>
            <div className={`${classPrefix}-modal__header`}>
              <div className={`${classPrefix}-modal__headertitle`}>
                {title}
              </div>
            </div>
            <div 
              className={classNames(`${classPrefix}-modal__body`, {
                [`${classPrefix}-modal__body--no-title`]: !title,
              })}
            >
              {content}
            </div>
            <div 
              className={`${classPrefix}-modal__footer ${classPrefix}-hairline--top`}
            >
              <Row justify="space-around" gutter={0}>
                {!hideCancel && (
                  <Col
                    className={`${classPrefix}-modal__footer-item ${classPrefix}-hairline--right`}
                  >
                    <Button
                      loading={cancelLoading}
                      disabled={confirmLoading}
                      {...cancelButtonProps}
                      onClick={handleCancel}
                      className={classNames(
                        `${classPrefix}-modal__button`,
                        `${classPrefix}-modal__button--cancel`,
                        cancelButtonProps.className
                      )}
                    >
                      {cancelText || t.cancelText}
                    </Button>
                  </Col>
                )}
                <Col className={`${classPrefix}-modal__footer-item`}>
                  <Button
                    loading={confirmLoading}
                    disabled={cancelLoading}
                    {...confirmButtonProps}
                    onClick={handleConfirm}
                    className={classNames(
                      `${classPrefix}-modal__button`,
                      `${classPrefix}-modal__button--confirm`,
                      confirmButtonProps.className
                    )}
                  >
                    {confirmText || t.confirmText}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      }
    />
  );
}

Modal.show = function show(options: ModalShowOptions) {
  modalEmitter.emit("show", options);
};

Modal.hide = function hide() {
  modalEmitter.emit("hide");
};
