export const enumsToOptions = (objects: Record<string, string>) =>
  Object.entries(objects).map(([key, value]) => ({
    label: value,
    value: key,
  }));
