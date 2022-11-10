import { removeFalsyObjects, removeDuplicateObjects } from "../lib/utils";

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

describe("removeDuplicateObjects", () => {
  it("returns a given object array with no duplicate properties", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const output = arr.filter(removeDuplicateObjects("id"));
    expect(output).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });
});
