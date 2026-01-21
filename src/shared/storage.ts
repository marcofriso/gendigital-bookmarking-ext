import { BOOKMARKS_STORAGE_KEY } from "./constants";

// Read the stored bookmark list from chrome.storage.local.
export const getBookmarksFromStorage = async (): Promise<unknown> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(BOOKMARKS_STORAGE_KEY, (result) => {
      resolve(result[BOOKMARKS_STORAGE_KEY]);
    });
  });
};

// Persist the bookmark list into chrome.storage.local.
export const setBookmarksInStorage = async (value: unknown): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [BOOKMARKS_STORAGE_KEY]: value }, () => {
      resolve();
    });
  });
};
