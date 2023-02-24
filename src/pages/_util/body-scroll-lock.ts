/* eslint-disable */
import { TaroEnv } from "./env";

const isTaro = function isTaro() {
  return TaroEnv === "weapp";
};

/**
 * tua-body-scroll-lock v1.2.1
 * (c) 2021 Evinma, BuptStEve
 * @license MIT
 */
function isServer() {
  return typeof window === "undefined";
}
function getUA() {
  return typeof navigator === "undefined" ? "" : navigator?.userAgent || "";
}
export function detectOS(ua?: string) {
  ua = ua || getUA();
  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  const ios = iphone || ipad;
  return {
    ios,
    android,
  };
}
function getEventListenerOptions(options) {
  /* istanbul ignore if */
  if (isServer() || isTaro()) return false;

  if (!options) {
    throw new Error("options must be provided");
  }

  let isSupportOptions = false;
  const listenerOptions = {
    get passive() {
      isSupportOptions = true;
      return;
    },
  };
  /* istanbul ignore next */

  const noop = function noop() {};

  const testEvent = "__TUA_BSL_TEST_PASSIVE__";
  window.addEventListener(testEvent as any, noop, listenerOptions as any);
  window.removeEventListener(testEvent as any, noop, listenerOptions as any);
  const { capture } = options;
  /* istanbul ignore next */

  return isSupportOptions
    ? options
    : typeof capture !== "undefined"
    ? capture
    : false;
}

let lockedNum = 0;
let initialClientY = 0;
let initialClientX = 0;
let unLockCallback = null;
let documentListenerAdded = false;
const lockedElements = [];
const eventListenerOptions = getEventListenerOptions({
  passive: false,
});
const supportsNativeSmoothScroll =
  !isServer() && "scrollBehavior" in document.documentElement.style;

const setOverflowHiddenPc = function setOverflowHiddenPc() {
  const $body = document.body;
  const bodyStyle = { ...$body.style };
  const scrollBarWidth = window.innerWidth - $body.clientWidth;
  $body.style.overflow = "hidden";
  $body.style.boxSizing = "border-box";
  $body.style.paddingRight = "".concat(String(scrollBarWidth), "px");
  return function () {
    ["overflow", "boxSizing", "paddingRight"].forEach(function (x) {
      $body.style[x] = bodyStyle[x] || "";
    });
  };
};

const setOverflowHiddenMobile = function setOverflowHiddenMobile() {
  const $html = document.documentElement;
  const $body = document.body;
  const scrollTop = $html.scrollTop || $body.scrollTop;
  const htmlStyle = { ...$html.style };
  const bodyStyle = { ...$body.style };
  $html.style.height = "100%";
  $html.style.overflow = "hidden";
  $body.style.top = "-".concat(String(scrollTop), "px");
  $body.style.width = "100%";
  $body.style.height = "auto";
  $body.style.position = "fixed";
  $body.style.overflow = "hidden";
  return function () {
    $html.style.height = htmlStyle.height || "";
    $html.style.overflow = htmlStyle.overflow || "";
    ["top", "width", "height", "overflow", "position"].forEach(function (x) {
      $body.style[x] = bodyStyle[x] || "";
    });
    supportsNativeSmoothScroll
      ? window.scrollTo({
          top: scrollTop,
          // @ts-ignore
          behavior: "instant",
        })
      : window.scrollTo(0, scrollTop);
  };
};

const preventDefault = function preventDefault(event) {
  if (!event.cancelable) return;
  event.preventDefault();
};

const handleScroll = function handleScroll(event, targetElement) {
  if (targetElement) {
    const { scrollTop } = targetElement;
    const { scrollLeft } = targetElement;
    const { scrollWidth } = targetElement;
    const { scrollHeight } = targetElement;
    const { clientWidth } = targetElement;
    const { clientHeight } = targetElement;
    const clientX = event.targetTouches[0].clientX - initialClientX;
    const clientY = event.targetTouches[0].clientY - initialClientY;
    const isVertical = Math.abs(clientY) > Math.abs(clientX);
    const isOnTop = clientY > 0 && scrollTop === 0;
    const isOnLeft = clientX > 0 && scrollLeft === 0;
    const isOnRight =
      clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth;
    const isOnBottom =
      clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;

    if (
      (isVertical && (isOnTop || isOnBottom)) ||
      (!isVertical && (isOnLeft || isOnRight))
    ) {
      return preventDefault(event);
    }
  }

  event.stopPropagation();
  return true;
};

const checkTargetElement = function checkTargetElement(targetElement) {
  if (targetElement) return;
  if (targetElement === null) return;
  if (process.env.NODE_ENV === "production") return;
  console.warn(
    "If scrolling is also required in the floating layer, " +
      "the target element must be provided."
  );
};

const lock = function lock(targetElement?: HTMLElement) {
  if (isServer()) return;
  checkTargetElement(targetElement);

  if (detectOS().ios) {
    // iOS
    if (targetElement) {
      const elementArray = Array.isArray(targetElement)
        ? targetElement
        : [targetElement];
      elementArray.forEach(function (element) {
        if (element && lockedElements.indexOf(element) === -1) {
          element.ontouchstart = function (event) {
            initialClientY = event.targetTouches[0].clientY;
            initialClientX = event.targetTouches[0].clientX;
          };

          element.ontouchmove = function (event) {
            if (event.targetTouches.length !== 1) return;
            handleScroll(event, element);
          };

          lockedElements.push(element);
        }
      });
    }

    if (!documentListenerAdded) {
      document.addEventListener(
        "touchmove",
        preventDefault,
        eventListenerOptions
      );
      documentListenerAdded = true;
    }
  } else if (lockedNum <= 0) {
    unLockCallback = detectOS().android
      ? setOverflowHiddenMobile()
      : setOverflowHiddenPc();
  }

  lockedNum += 1;
};

const unlock = function unlock(targetElement?: HTMLElement) {
  if (isServer()) return;
  checkTargetElement(targetElement);
  lockedNum -= 1;
  if (lockedNum > 0) return;

  if (!detectOS().ios && typeof unLockCallback === "function") {
    unLockCallback();
    return;
  } // iOS

  if (targetElement) {
    const elementArray = Array.isArray(targetElement)
      ? targetElement
      : [targetElement];
    elementArray.forEach(function (element) {
      const index = lockedElements.indexOf(element);

      if (index !== -1) {
        element.ontouchmove = null;
        element.ontouchstart = null;
        lockedElements.splice(index, 1);
      }
    });
  }

  if (documentListenerAdded) {
    document.removeEventListener(
      "touchmove",
      preventDefault,
      eventListenerOptions
    );
    documentListenerAdded = false;
  }
};

const clearBodyLocks = function clearBodyLocks() {
  if (isServer()) return;
  lockedNum = 0;

  if (!detectOS().ios && typeof unLockCallback === "function") {
    unLockCallback();
    return;
  } // IOS

  if (lockedElements.length) {
    // clear events
    let element = lockedElements.pop();

    while (element) {
      element.ontouchmove = null;
      element.ontouchstart = null;
      element = lockedElements.pop();
    }
  }

  if (documentListenerAdded) {
    document.removeEventListener(
      "touchmove",
      preventDefault,
      eventListenerOptions
    );
    documentListenerAdded = false;
  }
};

export { clearBodyLocks, lock, unlock };
