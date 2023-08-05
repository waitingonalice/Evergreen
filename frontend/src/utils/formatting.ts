/** Recursive function that finds a key and returns its respective value in a deeply nested object  */
export const findKey = (
  targetKey: string,
  object: Record<string, any>
): unknown | unknown[] | undefined => {
  if (!object) return undefined;
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key === targetKey) {
      return object[key];
    }
    if (typeof object[key] === "object") {
      const result = findKey(targetKey, object[key]);
      return result;
    }
  }
  return undefined;
};
