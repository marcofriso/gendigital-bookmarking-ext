export type Bookmark = {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
  description: string;
  createdAt: number;
};

export type SortMode = "time" | "title";

export type BookmarkDraft = Omit<Bookmark, "id" | "createdAt">;

export type BookmarkSaveRequest = {
  type: "BOOKMARK_SAVE_REQUEST";
};

export type BookmarkMetadataRequest = {
  type: "BOOKMARK_METADATA_REQUEST";
};

export type BookmarkMetadataResponse = {
  ok: boolean;
  data?: BookmarkDraft;
  error?: string;
};

export type BookmarkSaveResponse = {
  ok: boolean;
  data?: Bookmark[];
  error?: string;
};

export type BackgroundMessage = BookmarkSaveRequest;
export type ContentMessage = BookmarkMetadataRequest;
