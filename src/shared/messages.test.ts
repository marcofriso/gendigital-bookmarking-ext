import { describe, expect, it } from "vitest";
import { isBackgroundMessage, isContentMessage, isRuntimeMessage } from "./messages";

describe("message guards", () => {
  it("detects runtime messages with a type field", () => {
    expect(isRuntimeMessage({ type: "ANY" })).toBe(true);
    expect(isRuntimeMessage({})).toBe(false);
  });

  it("detects background message types", () => {
    expect(isBackgroundMessage({ type: "BOOKMARK_SAVE_REQUEST" })).toBe(true);
    expect(isBackgroundMessage({ type: "BOOKMARK_DELETE_REQUEST" })).toBe(true);
    expect(isBackgroundMessage({ type: "BOOKMARK_METADATA_REQUEST" })).toBe(false);
  });

  it("detects content message types", () => {
    expect(isContentMessage({ type: "BOOKMARK_METADATA_REQUEST" })).toBe(true);
    expect(isContentMessage({ type: "BOOKMARK_SAVE_REQUEST" })).toBe(false);
  });
});
