let env;

try {
  env = process.env.TARO_ENV;
  const docEnv = process.env.DOC_ENV;
  if (docEnv === "h5") {
    env = null;
  }
} catch (_) {
  // ignore
}


export const TaroEnv: "weapp" | "h5" = env;
