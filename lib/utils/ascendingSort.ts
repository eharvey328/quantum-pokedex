// sorting function to order by descending values
// optional parsing func to handle value retrieval
export const ascendingSort = <T extends {}>(
  a: T,
  b: T,
  parse?: (ref: T) => string | number | undefined
) => {
  const val1 = parse ? parse(a) : a;
  const val2 = parse ? parse(b) : b;
  // if both values are undefined, dont change order
  if (typeof val1 === "undefined" && typeof val2 === "undefined") return 0;
  // if the first value is undefined, move it after the next
  if (typeof val1 === "undefined") return 1;
  // if the second value is undefined, move it after the first
  if (typeof val2 === "undefined") return -1;
  // else convert values to numbers and keep lower items first
  return +val1 - +val2;
};
