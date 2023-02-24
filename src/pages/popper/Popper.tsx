import React, { useEffect, useRef, useState } from "react";
import { noop } from "../_util/noop";
import { uuid } from "../_util/uuid";
import { managerStatus, popperEmitter } from "./PopperManager";

export function Popper({ children }: { children: React.ReactNode }) {
  const idRef = useRef(uuid());
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (!managerStatus.ready) {
      setReady(false);
      return noop;
    }

    const id = idRef.current;
    popperEmitter.emit("show", id, children);
    return () => {
      popperEmitter.emit("hide", id);
    };
  }, [children]);

  if (!ready) {
    return <div>{children}</div>;
  }

  return <div></div>;
}
