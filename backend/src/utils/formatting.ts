export const isEmptyObjectValue = (object: Record<string, unknown>) =>
  Object.keys(object).length === 0 || Object.values(object).includes("");
