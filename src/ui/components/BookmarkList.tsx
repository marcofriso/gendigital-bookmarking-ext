import type { Bookmark } from "@shared/types";
import { BookmarkCard } from "./BookmarkCard";

type BookmarkListProps = {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
  emptyMessage: string;
  onOpen: (url: string) => void;
  onDelete: (id: string) => void;
};

// Render list states and bookmark cards.
export const BookmarkList = ({
  bookmarks,
  isLoading,
  error,
  isUpdating,
  emptyMessage,
  onOpen,
  onDelete
}: BookmarkListProps) => {
  if (isLoading) {
    return (
      <section className="list">
        <div className="empty">Loading bookmarks...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="list">
        <div className="empty">{error}</div>
      </section>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <section className="list">
        <div className="empty">{emptyMessage}</div>
      </section>
    );
  }

  return (
    <section className="list">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          isUpdating={isUpdating}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
