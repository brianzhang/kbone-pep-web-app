/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useLayoutEffect } from "react";
import { lock, unlock, clearBodyLocks, detectOS } from "./body-scroll-lock";
import { TaroEnv } from "./env";

const IsIOS = detectOS().ios;

export function useCatchMove(enable) {
  if (TaroEnv === "weapp") {
    return;
  }

  if (IsIOS) {
    useCatchMoveForIOS(enable);
    return;
  }

  useLayoutEffect(() => {
    if (enable) {
      lock();
    } else {
      unlock();
    }
  }, [enable]);

  useEffect(() => {
    return () => {
      clearBodyLocks();
    };
  }, []);
}

function setBodyStyle(style: React.CSSProperties): React.CSSProperties {
  const prevStyle: React.CSSProperties = {};
  const styleKeys = Object.keys(style);
  styleKeys.forEach(key => {
    prevStyle[key] = document.body.style[key];
  });
  styleKeys.forEach(key => {
    document.body.style[key] = style[key];
  });
  return prevStyle;
}

let originalStyle: React.CSSProperties = {};

export function useCatchMoveForIOS(enable) {
  useLayoutEffect(() => {
    if (enable) {
      originalStyle = setBodyStyle({
        overflow: "hidden",
        overflowX: "hidden",
        overflowY: "hidden",
        position: "relative",
      });
    } else {
      setBodyStyle(originalStyle);
      originalStyle = {};
    }
  }, [enable]);
}
