import BookmarkContext from "../context/bookmark-context";
import { findPathBookmarkNode } from "@/lib/bookmark/find";
import {
  buildBookmarkTree,
  convertToTBookmark,
} from "@/lib/bookmark/treenode.ts";
import {
  chromeCreateBookmark,
  chromeUpdateBookmark,
} from "@/lib/chrome-bookmark";
import { TBookmark } from "@/types/bookmark";
import React, { useState, useEffect, useRef, useReducer, Reducer } from "react";
import { Bookmarks, browser } from "wxt/browser";

export type TCreateBookmarkDetails = {
  name: string;
  url: string | null;
};

export type TEditBookmarkDetails = {
  name: string;
  url: string | null;
  nodeId: string;
};

type TBookmarkProviderProps = {
  children: React.ReactNode;
};

const BookmarkProvider: React.FC<TBookmarkProviderProps> = ({ children }) => {
  const [bookmarks, dispatch] = useReducer<
    Reducer<TBookmark[], TBookmarkAction>
  >(bookmarkReducer, []);
  const [checkedBookmarks, setCheckedBookmarks] = useState<Set<number>>(
    new Set(),
  );
  const pathRef = useRef<number[]>([]);
  const backHistoryRef = useRef<number[]>([]);
  const forwardHistoryRef = useRef<number[]>([]);
  const totalRef = useRef<number>(0);
  const bookmarkCountRef = useRef<number>(0);
  const folderCountRef = useRef<number>(0);

  const currentFolderId =
    pathRef.current.length == 0
      ? -1
      : pathRef.current[pathRef.current.length - 1];

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      if (tree.length == 1) {
        const newestBookmarks: TBookmark[] = [];
        const { total, bookmarkCount, folderCount } = buildBookmarkTree(
          tree[0],
          newestBookmarks,
          [0],
        );
        dispatch({ type: "initialization", bookmarks: newestBookmarks });
        pathRef.current = [0];
        totalRef.current = total;
        bookmarkCountRef.current = bookmarkCount;
        folderCountRef.current = folderCount;
      }
    });
  }, []);

  const isRoot = (): boolean => {
    return currentFolderId === 0;
  };

  const isForwardEmpty = (): boolean => {
    return forwardHistoryRef.current.length === 0;
  };

  const isBackwardEmpty = (): boolean => {
    return backHistoryRef.current.length === 0;
  };

  const handleOnSelect = (selectedIds: number[]) => {
    if (
      checkedBookmarks.size === 1 &&
      selectedIds.length === 1 &&
      checkedBookmarks.has(selectedIds[0])
    ) {
      const selectedElement = bookmarks[selectedIds[0]];

      switch (selectedElement.type) {
        case "folder":
          pathRef.current = [...pathRef.current, selectedElement.id];
          backHistoryRef.current.push(currentFolderId);
          forwardHistoryRef.current = [];
          setCheckedBookmarks(new Set());
          break;
        case "bookmark":
          browser.tabs.create({ url: selectedElement.url || undefined });
          break;
      }
    } else {
      setCheckedBookmarks(new Set(selectedIds));
    }
  };

  const goToRoot = () => {
    backHistoryRef.current.push(currentFolderId);
    forwardHistoryRef.current = [];
    pathRef.current = [0];
    setCheckedBookmarks(new Set());
  };

  const goToParent = () => {
    const element = pathRef.current.pop();

    if (!element) return;

    backHistoryRef.current.push(currentFolderId);
    forwardHistoryRef.current = [];
    setCheckedBookmarks(new Set());
  };

  const goBackward = () => {
    const element = backHistoryRef.current.pop();

    if (element === undefined) return;

    forwardHistoryRef.current.push(currentFolderId);
    pathRef.current = findPathBookmarkNode(bookmarks, 0, element)!;
    setCheckedBookmarks(new Set());
  };

  const goForward = () => {
    const element = forwardHistoryRef.current.pop();

    if (element === undefined) return;

    backHistoryRef.current.push(currentFolderId);
    pathRef.current = findPathBookmarkNode(bookmarks, 0, element)!;
    setCheckedBookmarks(new Set());
  };

  const createBookmark = async (
    details: TCreateBookmarkDetails,
  ): Promise<void> => {
    return chromeCreateBookmark(
      bookmarks[currentFolderId].nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      dispatch({ type: "creation", bookmark: bookmarkTreeNode });
    });
  };

  const editBookmark = async (details: TEditBookmarkDetails): Promise<void> => {
    return chromeUpdateBookmark(
      details.nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      dispatch({ type: "edition", bookmark: bookmarkTreeNode });
    });
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        checkedBookmarks,
        handleOnSelect,
        path: pathRef.current,
        total: totalRef.current,
        bookmarkCount: bookmarkCountRef.current,
        folderCount: folderCountRef.current,
        currentFolderId: currentFolderId,
        goToParent,
        goToRoot,
        isRoot,
        isForwardEmpty,
        goForward,
        goBackward,
        isBackwardEmpty,
        createBookmark,
        editBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

type TBookmarkAction =
  | { type: "initialization"; bookmarks: TBookmark[] }
  | { type: "creation"; bookmark: Bookmarks.BookmarkTreeNode }
  | { type: "deletion"; nodeId: string }
  | { type: "edition"; bookmark: Bookmarks.BookmarkTreeNode };

const bookmarkReducer = (bookmarks: TBookmark[], action: TBookmarkAction) => {
  let newBookmarksList: TBookmark[] = [];

  switch (action.type) {
    case "initialization":
      newBookmarksList = action.bookmarks;
      break;
    case "creation":
      const newBookmark = convertToTBookmark(action.bookmark, bookmarks.length);

      newBookmarksList = bookmarks.map((b) => {
        if (b.nodeId === newBookmark.parentId) {
          return {
            ...b,
            childrenIds: [...b.childrenIds, newBookmark.id],
          };
        }
        return b;
      });
      newBookmarksList = [...newBookmarksList, newBookmark];
      break;
    case "edition":
      newBookmarksList = bookmarks.map((b) => {
        if (b.nodeId === action.bookmark.id) {
          const newBookmark = convertToTBookmark(action.bookmark, b.id);

          return {
            ...newBookmark,
            childrenIds: [...b.childrenIds],
          };
        }
        return b;
      });
      break;
  }

  return newBookmarksList;
};

export default BookmarkProvider;
