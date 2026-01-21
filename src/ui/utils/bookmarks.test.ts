import { describe, expect, it } from "vitest";
import type { Bookmark } from "@shared/types";
import { getVisibleBookmarks } from "./bookmarks";

const base = (overrides: Partial<Bookmark>): Bookmark => ({
  id: "1",
  title: "Example",
  url: "https://example.com",
  description: "Example",
  createdAt: 1000,
  ...overrides,
});

describe("getVisibleBookmarks", () => {
  it("filters by title first, then url", () => {
    const items = [
      base({ id: "1", title: "Alpha", url: "https://alpha.com" }),
      base({ id: "2", title: "Beta", url: "https://match.me" }),
      base({ id: "3", title: "Gamma", url: "https://gamma.com" }),
    ];

    const result = getVisibleBookmarks(items, "match", "time");
    expect(result.map((item) => item.id)).toEqual(["2"]);
  });

  it("sorts by title when requested", () => {
    const items = [
      base({ id: "1", title: "Bravo", createdAt: 1 }),
      base({ id: "2", title: "Alpha", createdAt: 2 }),
    ];

    const result = getVisibleBookmarks(items, "", "title");
    expect(result.map((item) => item.title)).toEqual(["Alpha", "Bravo"]);
  });

  it("sorts by newest by default", () => {
    const items = [
      base({ id: "1", createdAt: 1 }),
      base({ id: "2", createdAt: 3 }),
      base({ id: "3", createdAt: 2 }),
    ];

    const result = getVisibleBookmarks(items, "", "time");
    expect(result.map((item) => item.id)).toEqual(["2", "3", "1"]);
  });
});
