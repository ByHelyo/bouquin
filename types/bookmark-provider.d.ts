import { TBookmark } from "@/types/bookmark";
import { Bookmarks } from "wxt/browser";

export type TCreateBookmarkDetails = {
  name: string;
  url: string | null;
};

export type TEditBookmarkDetails = {
  name: string;
  url: string | null;
  nodeId: string;
};

export type TCreateWindowDetails = {
  url: string;
  incognito?: boolean;
};

type TBookmarkAction =
  | { type: "initialization"; bookmarks: TBookmark[] }
  | { type: "creation"; bookmark: Bookmarks.BookmarkTreeNode }
  | { type: "deletion"; id: number }
  | { type: "edition"; bookmark: Bookmarks.BookmarkTreeNode };
