import React, { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";
import { ConfigContext, Config } from "./ConfigContext";

// setConfig
interface ConfigEventTypes {
  set: [Config];
}
class ConfigEmitter extends EventEmitter<ConfigEventTypes> {}
const configEmitter = new ConfigEmitter();

const configStore: Config = {};

export function getGlobalConfig() {
  return configStore;
}

export function setConfig(config: Config = {}) {
  Object.assign(configStore, config);
  configEmitter.emit("set", configStore);
}

// ConfigProvider
export interface ConfigProviderProps extends Config {
  children: React.ReactNode;
}

export function ConfigProvider({
  children,
  ...configProps
}: ConfigProviderProps) {
  const [globalConfig, setGlobalConfig] = useState<Config>(configStore);

  useEffect(() => {
    const callback = config => {
      setGlobalConfig(curConfig => ({ ...curConfig, ...config }));
    };
    configEmitter.on("set", callback);
    return () => {
      configEmitter.removeListener("set", callback);
    };
  }, []);

  useEffect(() => {
    // props 填充全局配置空白
    Object.assign(configStore, { ...configProps, ...configStore });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configProps.locale, configProps.classPrefix]);

  // props 优先级高于全局配置
  const config = { ...globalConfig, ...configProps };
  console.log(config);
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
