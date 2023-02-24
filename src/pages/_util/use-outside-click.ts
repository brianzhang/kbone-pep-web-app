import { useRef, useEffect } from "react";
import EventEmitter from "eventemitter3";
import { TaroEnv } from "./env";
import { getRect } from "./get-rect";

const outsideClickEmitter = new EventEmitter();
const OutsideClickEvent = "outside-click";

export function captureOutsideClick(event) {
  if (TaroEnv) {
    outsideClickEmitter.emit(OutsideClickEvent, event);
  }
}

// 计算小程序端targetRef节点是否包含于sourceRefs节点
async function contains(sourceRefs, targetRef) {
  let isContained = false;
  try {
    const [targetRect] = await getRect(targetRef);
    await Promise.all(
      sourceRefs
        .filter(ref => !!ref.current)
        .map(ref => {
          return getRect(ref).then(([rect]) => {
            if (
              targetRect.top >= rect.top &&
              targetRect.top + targetRect.height <= rect.top + rect.height &&
              targetRect.left >= rect.left &&
              targetRect.left + targetRect.width <= rect.left + rect.width
            ) {
              isContained = true;
            }
          });
        })
    );
  } catch (_) {
    // do nothing
  }
  return isContained;
}

/**
 * 提供一个 DOM，在 DOM 的外部点击之后，会触发回调函数
 * @param domRefs 给定一个或多个 DOM 的 ref，在此 DOM 之外点击认为是外部点击
 */
export function useOutsideClick(
  domRefs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  enabled = true
) {
  const timerRef = useRef(null);
  const eventRef = useRef(null);
  const reactEvtRef = useRef(null);
  const listenerRef = useRef(null);

  /**
   * 清理外部点击事件处理器
   */
  const remove = () => {
    listenerRef.current = null;
  };

  /**
   * 注册外部点击事件处理器
   * @param handle DOM 外部点击时的回调函数
   */
  const listen = (handle: (evt: MouseEvent) => void) => {
    listenerRef.current = (evt: MouseEvent) => {
      const refs = !Array.isArray(domRefs) ? [domRefs] : domRefs;

      if (TaroEnv) {
        contains(refs, {
          current: { uid: (evt as any).mpEvent.target.id },
        }).then(isContained => {
          if (!isContained) {
            handle(evt);
          }
        });
      } else {
        for (const domRef of refs) {
          if (domRef.current && domRef.current.contains(evt.target as Node)) {
            return;
          }
        }
        // Portal 上模拟的冒泡事件比 DOM 事件晚
        timerRef.current = setTimeout(() => {
          if (reactEvtRef.current !== evt) {
            handle(evt);
          }
        }, 0);
      }
    };
  };

  // 在 unmount 之后，无论如何要清理
  useEffect(() => {
    if (!enabled) {
      return () => null;
    }
    eventRef.current = evt => {
      if (listenerRef.current) {
        clearTimeout(timerRef.current);
        listenerRef.current(evt);
      }
    };
    if (TaroEnv) {
      outsideClickEmitter.on(OutsideClickEvent, eventRef.current);
    } else {
      document.addEventListener("mousedown", eventRef.current);
    }
    return () => {
      remove();
      clearTimeout(timerRef.current);
      if (TaroEnv) {
        outsideClickEmitter.off(OutsideClickEvent, eventRef.current);
      } else {
        document.removeEventListener("mousedown", eventRef.current);
      }
    };
  }, [enabled]);

  return {
    listen,
    remove,
    // 需要忽略的组件要传入的 Props
    ignoreProps: {
      onMouseDown: (evt: React.MouseEvent) => {
        reactEvtRef.current = evt.nativeEvent;
        return evt;
      },
    },
  };
}
