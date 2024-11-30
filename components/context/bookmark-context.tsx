import {
  TCreateBookmarkDetails,
  TEditBookmarkDetails,
} from "../provider/bookmark-provider";
import { TBookmark } from "@/types/bookmark";
import { createContext } from "react";

type TBookmarkContext = {
  bookmarks: TBookmark[];
  currentFolderId: number;
  checkedBookmarks: Set<number>;
  path: number[];
  total: number;
  bookmarkCount: number;
  folderCount: number;
  isRoot: () => boolean;
  isBackwardEmpty: () => boolean;
  isForwardEmpty: () => boolean;
  handleOnSelect: (value: number[]) => void;
  goToRoot: () => void;
  goToParent: () => void;
  goForward: () => void;
  goBackward: () => void;
  createBookmark: (details: TCreateBookmarkDetails) => Promise<void>;
  editBookmark: (details: TEditBookmarkDetails) => Promise<void>;
  deleteBookmark: (nodeId: string, id: number) => Promise<void>;
};

const BookmarkContext = createContext<TBookmarkContext | null>(null);

export default BookmarkContext;
