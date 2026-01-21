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

export type BookmarkDeleteRequest = {
  type: "BOOKMARK_DELETE_REQUEST";
  payload: {
    id: string;
  };
};

export type BookmarkMetadataRequest = {
  type: "BOOKMARK_METADATA_REQUEST";
};

export type RuntimeMessage = {
  type: string;
};

export type BookmarkMetadataResponse = {
  ok: boolean;
  data?: BookmarkDraft;
  error?: string;
};

export type BookmarkListResponse = {
  ok: boolean;
  data?: Bookmark[];
  error?: string;
};

export type BookmarkSaveResponse = BookmarkListResponse;
export type BookmarkDeleteResponse = BookmarkListResponse;

export type BackgroundMessage = BookmarkSaveRequest | BookmarkDeleteRequest;
export type ContentMessage = BookmarkMetadataRequest;
