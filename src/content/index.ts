import type {
  BookmarkDraft,
  BookmarkMetadataResponse,
  ContentMessage
} from "@shared/types";

// Keep runtime helpers local: content scripts cannot use ES module imports.
const isContentMessage = (value: unknown): value is ContentMessage =>
  typeof value === "object" && value !== null && "type" in value;

// Collapse whitespace so descriptions are readable and compact.
const normalizeText = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

// Collect the current tab metadata for saving.
const extractMetadata = (): BookmarkDraft => {
  const title = document.title?.trim() || "Untitled";
  const url = window.location.href;
  const iconUrl =
    document.querySelector<HTMLLinkElement>("link[rel*='icon']")?.href ??
    undefined;
  const pageText = normalizeText(document.body?.innerText ?? "");
  const metaDescription = normalizeText(
    document.querySelector<HTMLMetaElement>("meta[name='description']")
      ?.content ?? "",
  );
  const descriptionSource = pageText || metaDescription;
  const description = descriptionSource.slice(0, 100);

  return {
    title,
    url,
    iconUrl,
    description,
  };
};

// Content script: runs in the page to extract metadata on request.
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    isContentMessage(message) &&
    message.type === "BOOKMARK_METADATA_REQUEST"
  ) {
    // Reply with the metadata expected by the background script.
    const metadata = extractMetadata();
    const response: BookmarkMetadataResponse = { ok: true, data: metadata };

    sendResponse(response);
    return true;
  }

  return false;
});
