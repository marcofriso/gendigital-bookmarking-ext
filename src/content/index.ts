type ContentMessage = {
  type: string;
};

// Content script: runs in the page to extract metadata on request.
// export {};

const isContentMessage = (value: unknown): value is ContentMessage =>
  typeof value === "object" && value !== null && "type" in value;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    isContentMessage(message) &&
    message.type === "BOOKMARK_METADATA_REQUEST"
  ) {
    // TODO: Extract tab metadata (title, url, icon, description).
    sendResponse({ ok: false, error: "Not implemented" });
    return true;
  }

  return false;
});
