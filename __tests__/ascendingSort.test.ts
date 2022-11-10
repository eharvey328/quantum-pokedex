import { ascendingSort } from "../lib/utils";

describe("ascendingSort", () => {
  it("returns the given array sorted ascending", () => {
    const arr = [4, 3, 1, 2];
    const output = arr.sort(ascendingSort);
    expect(output).toStrictEqual([1, 2, 3, 4]);
  });
  it("returns the given object array sorted ascending", () => {
    const arr = [{ id: 4 }, { id: 3 }, { id: 1 }, { id: 2 }];
    const output = arr.sort((a, b) => ascendingSort(a, b, (val) => val.id));
    expect(output).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });
  it("returns the given object array with string keys sorted ascending", () => {
    const arr = [{ id: "4" }, { id: "3" }, { id: "1" }, { id: "2" }];
    const output = arr.sort((a, b) => ascendingSort(a, b, (val) => val.id));
    expect(output).toStrictEqual([
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
    ]);
  });
  it("returns the given object array sorted ascending with undefined values last", () => {
    const arr = [
      { id: 2, name: "2" },
      { id: 1, name: "1" },
      { name: "5" },
      { id: 3, name: "3" },
      { name: "6" },
      { id: 4, name: "4" },
    ];
    const output = arr.sort((a, b) => ascendingSort(a, b, (val) => val.id));
    expect(output).toStrictEqual([
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
      { name: "5" },
      { name: "6" },
    ]);
  });
});
