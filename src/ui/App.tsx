import { useState } from "react";
import type { SortMode } from "@shared/types";
import { useBookmarks } from "./hooks/useBookmarks";
import { BookmarkList } from "./components/BookmarkList";
import { Controls } from "./components/Controls";

const EMPTY_MESSAGE = "No bookmarks yet. Save a page to see it here.";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("time");
  const { bookmarks, isLoading, isUpdating, error, save, remove, open } =
    useBookmarks();

  const normalizedQuery = searchQuery.trim().toLowerCase();
  // Filter by title first, then fall back to URL matching,
  // then sort by title alphabetically or by most recent first.
  const visibleBookmarks = [...bookmarks]
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

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Bookmarks</h1>
          <p className="app__subtitle">Save this page to read later.</p>
        </div>
        <button
          type="button"
          className="button button--primary"
          onClick={save}
          disabled={isUpdating}
        >
          Save for later
        </button>
      </header>

      <Controls
        searchQuery={searchQuery}
        sortMode={sortMode}
        onSearchChange={setSearchQuery}
        onSortChange={setSortMode}
      />

      <BookmarkList
        bookmarks={visibleBookmarks}
        isLoading={isLoading}
        error={error}
        isUpdating={isUpdating}
        emptyMessage={EMPTY_MESSAGE}
        onOpen={open}
        onDelete={remove}
      />
    </div>
  );
}
