import { useState } from "react";
import type { Bookmark, SortMode } from "@shared/types";

const EMPTY_MESSAGE = "No bookmarks yet. Save a page to see it here.";

export default function App() {
  const [bookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("time");

  const handleSave = () => {
    // TODO: Trigger active tab metadata capture via background script.
  };

  const visibleBookmarks = bookmarks;

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Bookmarks</h1>
          <p className="app__subtitle">Save this page to read later.</p>
        </div>
        <button type="button" className="button button--primary" onClick={handleSave}>
          Save for later
        </button>
      </header>

      <section className="controls">
        <label className="control">
          <span className="control__label">Search</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title or URL"
            type="search"
          />
        </label>
        <label className="control">
          <span className="control__label">Sort</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
            <option value="time">Time added</option>
            <option value="title">Title</option>
          </select>
        </label>
      </section>

      <section className="list">
        {visibleBookmarks.length === 0 ? (
          <div className="empty">{EMPTY_MESSAGE}</div>
        ) : (
          visibleBookmarks.map((bookmark) => (
            <article key={bookmark.id} className="card">
              <div className="card__header">
                <div className="card__title-row">
                  {bookmark.iconUrl ? (
                    <img src={bookmark.iconUrl} alt="" className="card__icon" />
                  ) : (
                    <div className="card__icon card__icon--placeholder" />
                  )}
                  <div>
                    <h2 className="card__title">{bookmark.title}</h2>
                    <p className="card__url">{bookmark.url}</p>
                  </div>
                </div>
                <div className="card__actions">
                  <button type="button" className="button button--ghost">
                    Open
                  </button>
                  <button type="button" className="button button--ghost button--danger">
                    Delete
                  </button>
                </div>
              </div>
              <p className="card__description">{bookmark.description}</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
