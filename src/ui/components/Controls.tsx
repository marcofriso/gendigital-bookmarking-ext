import type { SortMode } from "@shared/types";

type ControlsProps = {
  searchQuery: string;
  sortMode: SortMode;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortMode) => void;
};

// Search and sort controls for the bookmark list.
export const Controls = ({
  searchQuery,
  sortMode,
  onSearchChange,
  onSortChange
}: ControlsProps) => {
  return (
    <section className="controls">
      <label className="control">
        <span className="control__label">Search</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or URL"
          type="search"
        />
      </label>
      <label className="control">
        <span className="control__label">Sort</span>
        <select value={sortMode} onChange={(event) => onSortChange(event.target.value as SortMode)}>
          <option value="time">Time added</option>
          <option value="title">Title</option>
        </select>
      </label>
    </section>
  );
};
