import type { Bookmark } from "@shared/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
  onOpen: (url: string) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
};

// Display a single saved bookmark row.
export const BookmarkCard = ({
  bookmark,
  onOpen,
  onDelete,
  isUpdating
}: BookmarkCardProps) => {
  return (
    <article className="card">
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
          <button
            type="button"
            className="button button--ghost"
            onClick={() => onOpen(bookmark.url)}
          >
            Open
          </button>
          <button
            type="button"
            className="button button--ghost button--danger"
            onClick={() => onDelete(bookmark.id)}
            disabled={isUpdating}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="card__description">{bookmark.description}</p>
    </article>
  );
};
