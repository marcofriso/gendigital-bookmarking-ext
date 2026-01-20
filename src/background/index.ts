type BackgroundMessage = {
  type: string;
  payload?: unknown;
};

// MV3 service worker: handles messages and coordinates storage/API work.
// export {};

const isBackgroundMessage = (value: unknown): value is BackgroundMessage =>
  typeof value === "object" && value !== null && "type" in value;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    isBackgroundMessage(message) &&
    message.type === "BOOKMARK_SAVE_REQUEST"
  ) {
    // TODO: Persist bookmark data to chrome.storage.
    sendResponse({ ok: false, error: "Not implemented" });
    return true;
  }

  return false;
});
