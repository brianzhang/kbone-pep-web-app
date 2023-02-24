import React from "react";

export interface StandardProps extends EventProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export interface FormItemProps {
  name?: string;
}

export interface EventProps {
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchCancel?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onClick?: (event: React.UIEvent) => void;
  onLongPress?: (event: CommonEvent) => void;
}

export type BaseEventOrigFunction<T = any> = (event: BaseEventOrig<T>) => void;

export type TouchEventFunction<T = any> = (event: ITouchEvent<T>) => void;

export type CommonEvent<T = any> = BaseEventOrig<T>;

export type CommonEventFunction<T = any> = BaseEventOrigFunction<T>;

export interface BaseEventOrig<T = any> extends React.BaseSyntheticEvent {
  detail?: any;
}

export interface ITouchEvent<T = any> extends React.UIEvent {
  changedTouches?: React.TouchEvent["changedTouches"];
  targetTouches?: React.TouchEvent["targetTouches"];
  touches?: React.TouchEvent["touches"];
}
