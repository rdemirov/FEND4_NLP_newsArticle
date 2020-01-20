import { checkUrl } from "./helpers";

describe("URL validate function", () => {
  test("testing with valid URL should return true", () => {
    expect(checkUrl("www.google.com")).toBeTruthy();
  });
  test("testing with invalid URL should return false", () => {
    expect(checkUrl("checkString")).toBeFalsy();
  });
});
