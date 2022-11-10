export const removeFalsyObjects = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc = { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};

// given an object and the id key
// removes any duplicate values leaving the single instance
export const removeDuplicateObjects =
  <T extends Record<string, {}>>(idKey: string) =>
  (value: T, index: number, self: any) => {
    return (
      index ===
      self.findIndex((selfItem: T) => value[idKey] === selfItem[idKey])
    );
  };
