import { anyToString } from "../anyToString";

describe("test cases", () => {
  it("should work ", () => {
    expect(anyToString(222)).toBe("222");
    expect(anyToString({})).toBe("[object Object]");
  });
});
