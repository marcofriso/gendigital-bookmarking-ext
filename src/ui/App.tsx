import { useState } from "react";
import type { SortMode } from "@shared/types";
import { useBookmarks } from "./hooks/useBookmarks";
import { BookmarkList } from "./components/BookmarkList";
import { Controls } from "./components/Controls";
import { getVisibleBookmarks } from "./utils/bookmarks";

const EMPTY_MESSAGE = "No bookmarks yet. Save a page to see it here.";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("time");
  const {
    bookmarks,
    isLoading,
    isUpdating,
    error,
    saveBookmark,
    deleteBookmark,
    openBookmark
  } = useBookmarks();

  const visibleBookmarks = getVisibleBookmarks(
    bookmarks,
    searchQuery,
    sortMode,
  );

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
          onClick={saveBookmark}
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
        onOpen={openBookmark}
        onDelete={deleteBookmark}
      />
    </div>
  );
}
