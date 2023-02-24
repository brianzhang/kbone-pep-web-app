import { MutableRefObject, Ref } from "react";

export function mergeRefs<T>(...refs: Ref<T>[]) {
  return (instance: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && typeof ref === "object") {
        try {
          (ref as MutableRefObject<unknown>).current = instance;
        } catch (_) {
          // ignore
        }
      }
    }
  };
}
