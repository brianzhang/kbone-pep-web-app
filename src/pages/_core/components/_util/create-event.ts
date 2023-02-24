import { BaseEventOrig } from "../types/common";

export function createEvent(event: BaseEventOrig, detail = {}) {
  const {
    nativeEvent,
    currentTarget,
    target,
    bubbles,
    cancelable,
    defaultPrevented,
    eventPhase,
    isTrusted,
    preventDefault,
    isDefaultPrevented,
    stopPropagation,
    isPropagationStopped,
    persist,
    timeStamp,
    type,
  } = event;
  return {
    nativeEvent,
    currentTarget,
    target,
    bubbles,
    cancelable,
    defaultPrevented,
    eventPhase,
    isTrusted,
    preventDefault,
    isDefaultPrevented,
    stopPropagation,
    isPropagationStopped,
    persist,
    timeStamp,
    type,
    detail,
  };
}
