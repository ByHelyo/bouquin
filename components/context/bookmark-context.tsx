import { TBookmark } from "@/types/bookmark";
import {
  TCreateBookmarkDetails,
  TCreateWindowDetails,
  TEditBookmarkDetails,
} from "@/types/bookmark-provider";
import { createContext } from "react";

type TBookmarkContext = {
  bookmarkCount: number;
  bookmarks: TBookmark[];
  checkedBookmarks: Set<number>;
  createBookmark: (details: TCreateBookmarkDetails) => Promise<void>;
  createWindow: (details: TCreateWindowDetails) => Promise<void>;
  currentFolderId: number;
  deleteBookmark: (nodeId: string, id: number) => Promise<void>;
  editBookmark: (details: TEditBookmarkDetails) => Promise<void>;
  folderCount: number;
  goBackward: () => void;
  goForward: () => void;
  goToParent: () => void;
  goToRoot: () => void;
  handleOnSelect: (value: number[]) => Promise<void>;
  isBackwardEmpty: () => boolean;
  isForwardEmpty: () => boolean;
  isRoot: () => boolean;
  openTab: (url: string) => Promise<void>;
  path: number[];
  total: number;
};

const BookmarkContext = createContext<TBookmarkContext | null>(null);

export default BookmarkContext;
