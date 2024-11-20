import { findPathBookmarkNode } from "@/lib/bookmark/find";
import {
  buildBookmarkTree,
  convertToTBookmark,
} from "@/lib/bookmark/treenode.ts";
import { chromeCreateBookmark } from "@/lib/chrome-bookmark";
import { TBookmark } from "@/types/bookmark";
import React, { createContext, useState, useEffect, useRef } from "react";
import { browser } from "wxt/browser";

export type TCreateBookmarkDetails = {
  name: string;
  url: string | null;
  type: "bookmark" | "folder";
};

export const ChromeBookmarkContext = createContext<{
  bookmarks: TBookmark[];
  currentDirectoryId: number;
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
} | null>(null);

type ChromeBookmarkProviderProps = {
  children: React.ReactNode;
};

export const ChromeBookmarkProvider: React.FC<ChromeBookmarkProviderProps> = ({
  children,
}) => {
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

      if (selectedElement.type === "folder") {
        pathRef.current = [...pathRef.current, selectedElement.id];
        backHistoryRef.current.push(currentDirectoryId);
        forwardHistoryRef.current = [];
        setCheckedBookmarks(new Set());
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

  const createBookmark = async (details: TCreateBookmarkDetails) => {
    chromeCreateBookmark(
      bookmarks[currentDirectoryId].nodeId,
      details.name,
      details.url || undefined,
      details.type,
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
      console.log(newBookmarksList);
      setBookmarks([...newBookmarksList, newBookmark]);
    });
  };

  return (
    <ChromeBookmarkContext.Provider
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
      }}
    >
      {children}
    </ChromeBookmarkContext.Provider>
  );
};
