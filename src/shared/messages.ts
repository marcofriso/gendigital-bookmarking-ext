import type { BackgroundMessage, ContentMessage } from "./types";

type RuntimeMessage = {
  type: string;
};

const isRuntimeMessage = (value: unknown): value is RuntimeMessage =>
  typeof value === "object" && value !== null && "type" in value;

export const isBackgroundMessage = (value: unknown): value is BackgroundMessage =>
  isRuntimeMessage(value) && value.type === "BOOKMARK_SAVE_REQUEST";

export const isContentMessage = (value: unknown): value is ContentMessage =>
  isRuntimeMessage(value) && value.type === "BOOKMARK_METADATA_REQUEST";
