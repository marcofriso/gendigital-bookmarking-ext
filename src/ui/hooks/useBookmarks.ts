import { useEffect, useState } from "react";
import type {
  BackgroundMessage,
  Bookmark,
  BookmarkListResponse,
} from "@shared/types";
import { getBookmarksFromStorage } from "@shared/constants";

type UseBookmarksResult = {
  bookmarks: Bookmark[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  reload: () => Promise<void>;
  save: () => Promise<void>;
  remove: (id: string) => Promise<void>;
  open: (url: string) => void;
};

// Manage bookmark data and background interactions for the side panel.
export const useBookmarks = (): UseBookmarksResult => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coerceBookmarks = (value: unknown): Bookmark[] =>
    Array.isArray(value) ? (value as Bookmark[]) : [];

  const loadBookmarks = async () => {
    try {
      const stored = await getBookmarksFromStorage();
      setBookmarks(coerceBookmarks(stored));
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load bookmarks.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fire-and-forget to keep the effect synchronous.
    void loadBookmarks();
  }, []);

  const requestBookmarkUpdate = async (
    message: BackgroundMessage,
  ): Promise<BookmarkListResponse> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response: BookmarkListResponse) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        resolve(response);
      });
    });
  };

  const save = async () => {
    setError(null);
    setIsUpdating(true);
    try {
      const response = await requestBookmarkUpdate({
        type: "BOOKMARK_SAVE_REQUEST",
      });
      if (!response.ok || !response.data) {
        throw new Error(response.error ?? "Failed to save bookmark.");
      }
      setBookmarks(response.data);
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : "Failed to save bookmark.";
      setError(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const remove = async (id: string) => {
    setError(null);
    setIsUpdating(true);
    try {
      const response = await requestBookmarkUpdate({
        type: "BOOKMARK_DELETE_REQUEST",
        payload: { id },
      });
      if (!response.ok || !response.data) {
        throw new Error(response.error ?? "Failed to delete bookmark.");
      }
      setBookmarks(response.data);
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete bookmark.";
      setError(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const open = (url: string) => {
    chrome.tabs.create({ url });
  };

  return {
    bookmarks,
    isLoading,
    isUpdating,
    error,
    reload: loadBookmarks,
    save,
    remove,
    open,
  };
};
