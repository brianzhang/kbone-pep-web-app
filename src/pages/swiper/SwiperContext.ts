import { createContext } from "react";

export interface SwiperContext {
  zoom?: any;
}

export const SwiperContext = createContext<SwiperContext>({});
