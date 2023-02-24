export function uuid() {
  return (
    Math.random().toString(36).substring(2) + (+new Date()).toString(36)
  ).substring(0, 12);
}
