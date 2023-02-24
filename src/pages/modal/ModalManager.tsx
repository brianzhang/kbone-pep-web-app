import React, { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";
import { Modal, ModalShowOptions } from "./Modal";
import { callBoth } from "../_util/call-both";

interface ModalEventTypes {
  show: [ModalShowOptions];
  hide: [];
}

class ModalEmitter extends EventEmitter<ModalEventTypes> {}

export const modalEmitter = new ModalEmitter();

export function ModalManager(props: ModalShowOptions) {
  const [options, setOptions] = useState<
    ModalShowOptions & { visible?: boolean }
  >(props);

  useEffect(() => {
    const onShow = ({ ...options }) => {
      setOptions({ ...options, visible: true });
    };
    const onHide = () => {
      setOptions(options => ({ ...options, visible: false }));
    };

    modalEmitter.on("show", onShow);
    modalEmitter.on("hide", onHide);
    return () => {
      modalEmitter.removeListener("show", onShow);
      modalEmitter.removeListener("hide", onHide);
    };
  }, []);

  return (
    <Modal
      {...options}
      destroyOnClose
      onClose={callBoth(options.onClose, () => modalEmitter.emit("hide"))}
    />
  );
}
