import { normalizeQueryParam } from "../lib/utils";

describe("normalizeQueryParam", () => {
  it("returns the value if value is not an array", () => {
    const value = "test";
    const output = normalizeQueryParam(value);
    expect(output).toStrictEqual(value);
  });

  it("returns the first index if value an array", () => {
    const value = ["test", "test2"];
    const output = normalizeQueryParam(value);
    expect(output).toStrictEqual(value[0]);
  });
});
