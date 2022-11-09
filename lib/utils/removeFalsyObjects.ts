export const removeFalsyObjects = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc = { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};
