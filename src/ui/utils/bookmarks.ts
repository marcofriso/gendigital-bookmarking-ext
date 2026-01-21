import type { Bookmark, SortMode } from "@shared/types";

const normalize = (value: string): string => value.trim().toLowerCase();

// Filter and sort bookmarks by query and mode.
export const getVisibleBookmarks = (
  bookmarks: Bookmark[],
  query: string,
  sortMode: SortMode,
): Bookmark[] => {
  const normalizedQuery = normalize(query);

  return [...bookmarks]
    .filter((bookmark) => {
      if (!normalizedQuery) {
        return true;
      }
      const titleMatch = bookmark.title.toLowerCase().includes(normalizedQuery);
      if (titleMatch) {
        return true;
      }
      return bookmark.url.toLowerCase().includes(normalizedQuery);
    })
    .sort((a, b) => {
      if (sortMode === "title") {
        return a.title.localeCompare(b.title);
      }
      return b.createdAt - a.createdAt;
    });
};
