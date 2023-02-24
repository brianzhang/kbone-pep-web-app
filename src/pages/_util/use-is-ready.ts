import { useState, useEffect, useRef } from "react";
import { useReady as useTaroReady, nextTick } from "@tarojs/taro";
import { TaroEnv } from "./env";

/**
 * 兼容 useReady
 */
export const useReady = (fn: () => void | Promise<void>) => {
  const callRef = useRef(false);
  if (TaroEnv) {
    // https://nervjs.github.io/taro/docs/react#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84-onready
    const call = () => {
      if (!callRef.current) {
        callRef.current = true;
        fn();
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTaroReady(() => {
      call();
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      nextTick(() => {
        call();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fn();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }
};

/**
 * 对 [useReady](https://nervjs.github.io/taro/docs/hooks/#useready) 的简单封装，在 ready 之前返回 false，ready 之后返回 true
 */
export function useIsReady() {
  const [ready, setReady] = useState(false);
  useReady(() => setReady(true));
  return ready;
}
