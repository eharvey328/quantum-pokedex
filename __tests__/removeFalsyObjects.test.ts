import { removeFalsyObjects } from "../lib/utils";

describe("removeFalsyObjects", () => {
  it("returns the given object with no falsy props", () => {
    const obj = {
      id: 1,
      value: "test",
      empty: "",
      zero: 0,
      null: null,
      undefined: undefined,
      false: false,
    };
    const output = removeFalsyObjects(obj);
    expect(output).toStrictEqual({
      id: 1,
      value: "test",
    });
  });
});
