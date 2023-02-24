import React, { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";
import { View } from "@tarojs/components";
import { useConfig } from "../_util/use-config";

interface PopperEventTypes {
  show: [string, React.ReactNode];
  hide: [string];
}

class PopperEmitter extends EventEmitter<PopperEventTypes> {}

export const popperEmitter = new PopperEmitter();

export const managerStatus = { ready: false };

interface Layer {
  id: string;
  content: React.ReactNode;
}

export function PopupContainer() {
  useState(() => {
    managerStatus.ready = true;
    return true;
  });

  const [layers, setLayers] = useState<Layer[]>([]);
  const { classPrefix } = useConfig();

  useEffect(() => {
    const onShow = (id, content) => {
      setLayers(layers => [
        ...layers.filter(i => i.id !== id),
        { id, content },
      ]);
    };

    const onHide = id => {
      setLayers(layers => layers.filter(i => i.id !== id));
    };

    popperEmitter.on("show", onShow);
    popperEmitter.on("hide", onHide);
    return () => {
      managerStatus.ready = false;
      popperEmitter.removeListener("show", onShow);
      popperEmitter.removeListener("hide", onHide);
    };
  }, []);

  return (
    <div className={`${classPrefix}-overlay-root`}>
      {layers.map(({ id, content }) => (
        <div className={`${classPrefix}-overlay-layer`} key={id}>
          {content}
        </div>
      ))}
    </div>
  );
}
