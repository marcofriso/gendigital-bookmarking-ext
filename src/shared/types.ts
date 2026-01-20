export type Bookmark = {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
  description: string;
  createdAt: number;
};

export type SortMode = "time" | "title";
