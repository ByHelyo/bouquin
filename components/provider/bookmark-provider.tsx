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
import React, { useState, useEffect, useRef } from "react";
import { browser } from "wxt/browser";

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
  const [bookmarks, setBookmarks] = useState<TBookmark[]>([]);
  const [checkedBookmarks, setCheckedBookmarks] = useState<Set<number>>(
    new Set(),
  );
  const pathRef = useRef<number[]>([]);
  const backHistoryRef = useRef<number[]>([]);
  const forwardHistoryRef = useRef<number[]>([]);
  const totalRef = useRef<number>(0);
  const bookmarkCountRef = useRef<number>(0);
  const folderCountRef = useRef<number>(0);

  const currentDirectoryId =
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
        setBookmarks(newestBookmarks);
        pathRef.current = [0];
        totalRef.current = total;
        bookmarkCountRef.current = bookmarkCount;
        folderCountRef.current = folderCount;
      }
    });
  }, []);

  const isRoot = (): boolean => {
    return currentDirectoryId === 0;
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
          backHistoryRef.current.push(currentDirectoryId);
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
    backHistoryRef.current.push(currentDirectoryId);
    forwardHistoryRef.current = [];
    pathRef.current = [0];
    setCheckedBookmarks(new Set());
  };

  const goToParent = () => {
    const element = pathRef.current.pop();

    if (!element) return;

    backHistoryRef.current.push(currentDirectoryId);
    forwardHistoryRef.current = [];
    setCheckedBookmarks(new Set());
  };

  const goBackward = () => {
    const element = backHistoryRef.current.pop();

    if (element === undefined) return;

    forwardHistoryRef.current.push(currentDirectoryId);
    pathRef.current = findPathBookmarkNode(bookmarks, 0, element)!;
    setCheckedBookmarks(new Set());
  };

  const goForward = () => {
    const element = forwardHistoryRef.current.pop();

    if (element === undefined) return;

    backHistoryRef.current.push(currentDirectoryId);
    pathRef.current = findPathBookmarkNode(bookmarks, 0, element)!;
    setCheckedBookmarks(new Set());
  };

  const createBookmark = async (
    details: TCreateBookmarkDetails,
  ): Promise<void> => {
    return chromeCreateBookmark(
      bookmarks[currentDirectoryId].nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      const newBookmark = convertToTBookmark(
        bookmarkTreeNode,
        bookmarks.length,
      );
      const newBookmarksList = bookmarks.map((b) => {
        if (b.nodeId === newBookmark.parentId) {
          return {
            ...b,
            childrenIds: [...b.childrenIds, newBookmark.id],
          };
        }
        return b;
      });
      setBookmarks([...newBookmarksList, newBookmark]);
    });
  };

  const editBookmark = async (details: TEditBookmarkDetails): Promise<void> => {
    return chromeUpdateBookmark(
      details.nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      const newBookmark = convertToTBookmark(
        bookmarkTreeNode,
        bookmarks.length,
      );
      const newBookmarksList = bookmarks.map((b) => {
        if (b.nodeId === details.nodeId) {
          return {
            ...b,
            childrenIds: [...b.childrenIds],
          };
        }
        return b;
      });
      setBookmarks(newBookmarksList);
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
        currentDirectoryId,
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

export default BookmarkProvider;
