import { describe, expect, it, vi } from "vitest";
import { subscribeToStorageChanges } from "./useBookmarks";

describe("subscribeToStorageChanges", () => {
  it("warns and returns a no-op cleanup when storage API is missing", () => {
    vi.stubGlobal("chrome", {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const listener = vi.fn();

    const cleanup = subscribeToStorageChanges(listener as never);

    expect(warnSpy).toHaveBeenCalledWith("Extension storage API not available.");
    expect(() => cleanup()).not.toThrow();
  });

  it("registers and unregisters the provided listener", () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();

    vi.stubGlobal("chrome", {
      storage: {
        onChanged: {
          addListener,
          removeListener,
        },
      },
    });

    const listener = vi.fn();
    const cleanup = subscribeToStorageChanges(listener as never);

    expect(addListener).toHaveBeenCalledWith(listener);
    cleanup();
    expect(removeListener).toHaveBeenCalledWith(listener);
  });
});
