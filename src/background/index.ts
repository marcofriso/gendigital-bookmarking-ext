import type {
  Bookmark,
  BookmarkDeleteRequest,
  BookmarkDraft,
  BookmarkListResponse,
  BookmarkMetadataResponse,
} from "@shared/types";
import {
  getBookmarksFromStorage,
  setBookmarksInStorage,
} from "@shared/storage";
import { isBackgroundMessage } from "@shared/messages";

// Ask the active tab for metadata to save.
const requestMetadataFromActiveTab = async (): Promise<BookmarkDraft> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab?.id === undefined) {
        reject(new Error("No active tab found"));
        return;
      }

      const tabId: number = activeTab.id;

      const requestMetadata = () => {
        chrome.tabs.sendMessage(
          tabId,
          { type: "BOOKMARK_METADATA_REQUEST" },
          (response: BookmarkMetadataResponse) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
              return;
            }

            if (!response?.ok || !response.data) {
              reject(new Error(response?.error ?? "No metadata returned"));
              return;
            }

            resolve(response.data);
          },
        );
      };

      // First try to request metadata directly.
      chrome.tabs.sendMessage(
        tabId,
        { type: "BOOKMARK_METADATA_REQUEST" },
        () => {
          if (!chrome.runtime.lastError) {
            requestMetadata();
            return;
          }

          // If that fails, inject the content script and try again.
          chrome.scripting.executeScript(
            { target: { tabId }, files: ["content.js"] },
            () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }

              requestMetadata();
            },
          );
        },
      );
    });
  });
};

// Normalize storage output into a bookmark array.
const coerceBookmarks = (value: unknown): Bookmark[] =>
  Array.isArray(value) ? (value as Bookmark[]) : [];

// Create a full bookmark record with id and timestamp.
const buildBookmark = (draft: BookmarkDraft): Bookmark => ({
  ...draft,
  id:
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  createdAt: Date.now(),
});

// Fetch metadata, store it, and return the updated list.
// Handles both new saves and updates to existing bookmarks.
const handleSave = async (
  sendResponse: (response: BookmarkListResponse) => void,
) => {
  try {
    const metadata = await requestMetadataFromActiveTab();
    const stored = await getBookmarksFromStorage();
    const bookmarks = coerceBookmarks(stored);

    const existingIndex = bookmarks.findIndex(
      (bookmark) => bookmark.url === metadata.url,
    );
    const nextBookmark =
      existingIndex >= 0
        ? {
            ...bookmarks[existingIndex],
            ...metadata,
            createdAt: Date.now(),
          }
        : buildBookmark(metadata);

    const remaining =
      existingIndex >= 0
        ? bookmarks.filter((bookmark) => bookmark.url !== metadata.url)
        : bookmarks;

    const updated = [nextBookmark, ...remaining];

    await setBookmarksInStorage(updated);

    sendResponse({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";

    sendResponse({ ok: false, error: message });
  }
};

// Remove a bookmark by id and return the updated list.
const handleDelete = async (
  payload: BookmarkDeleteRequest["payload"],
  sendResponse: (response: BookmarkListResponse) => void,
) => {
  if (!payload?.id) {
    sendResponse({ ok: false, error: "Missing bookmark id" });
    return;
  }

  try {
    const stored = await getBookmarksFromStorage();
    const bookmarks = coerceBookmarks(stored);
    const updated = bookmarks.filter((bookmark) => bookmark.id !== payload.id);

    await setBookmarksInStorage(updated);

    sendResponse({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";

    sendResponse({ ok: false, error: message });
  }
};

// MV3 service worker: handles messages and coordinates storage/API work.
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!isBackgroundMessage(message)) {
    return false;
  }

  if (message.type === "BOOKMARK_SAVE_REQUEST") {
    void handleSave(sendResponse);
    return true;
  }

  if (message.type === "BOOKMARK_DELETE_REQUEST") {
    void handleDelete(message.payload, sendResponse);
    return true;
  }

  return false;
});

// Toggle the side panel when the extension action is clicked.
const sidePanelState = new Map<number, boolean>();

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) {
    return;
  }

  const tabId = tab.id;
  const isOpen = sidePanelState.get(tabId) ?? false;

  if (isOpen) {
    chrome.sidePanel.setOptions({ tabId, enabled: false }, () => {
      if (!chrome.runtime.lastError) {
        sidePanelState.set(tabId, false);
      }
    });
    return;
  }

  // Open the side panel.
  chrome.sidePanel.setOptions(
    { tabId, enabled: true, path: "sidepanel.html" },
    () => {
      if (chrome.runtime.lastError) {
        return;
      }
      chrome.sidePanel.open({ tabId }, () => {
        if (!chrome.runtime.lastError) {
          sidePanelState.set(tabId, true);
        }
      });
    },
  );
});
