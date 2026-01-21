import { describe, expect, it, vi } from "vitest";
import { BOOKMARKS_STORAGE_KEY } from "./constants";
import { getBookmarksFromStorage, setBookmarksInStorage } from "./storage";

type ChromeStorageMock = {
  storage: {
    local: {
      get: (key: string, callback: (result: Record<string, unknown>) => void) => void;
      set: (items: Record<string, unknown>, callback: () => void) => void;
    };
  };
};

const createChromeMock = (): ChromeStorageMock => {
  const store: Record<string, unknown> = {};

  return {
    storage: {
      local: {
        get: (key, callback) => {
          callback({ [key]: store[key] });
        },
        set: (items, callback) => {
          Object.assign(store, items);
          callback();
        },
      },
    },
  };
};

describe("storage helpers", () => {
  it("reads the bookmarks key", async () => {
    const chromeMock = createChromeMock();
    chromeMock.storage.local.set({ [BOOKMARKS_STORAGE_KEY]: ["a"] }, () => {});
    vi.stubGlobal("chrome", chromeMock);

    const result = await getBookmarksFromStorage();
    expect(result).toEqual(["a"]);
  });

  it("writes the bookmarks key", async () => {
    const chromeMock = createChromeMock();
    vi.stubGlobal("chrome", chromeMock);

    await setBookmarksInStorage([{ id: "1" }]);
    const result = await getBookmarksFromStorage();
    expect(result).toEqual([{ id: "1" }]);
  });
});
