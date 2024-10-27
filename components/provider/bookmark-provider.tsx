import { findPathBookmarkNode } from "@/lib/bookmark/find";
import { visitBookmarkTreeNode } from "@/lib/bookmark/treenode.ts";
import { TBookmark } from "@/types/bookmark";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { browser } from "wxt/browser";

const BookmarkContext = createContext<{
  rootBookmark: TBookmark | null;
  currentDirectory: TBookmark | null;
  checkedBookmarks: Set<string>;
  path: TBookmark[];
  total: number;
  bookmarkCount: number;
  folderCount: number;
  isRoot: () => boolean;
  isParent: () => boolean;
  isBackwardEmpty: () => boolean;
  isForwardEmpty: () => boolean;
  handleOnSelect: (value: string[]) => void;
  goToRoot: () => void;
  goToParent: () => void;
  goForward: () => void;
  goBackward: () => void;
} | null>(null);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rootBookmark, setRootBookmark] = useState<TBookmark | null>(null);
  const [currentDirectory, setCurrentDirectory] = useState<TBookmark | null>(
    null,
  );
  const [checkedBookmarks, setCheckedBookmarks] = useState<Set<string>>(
    new Set(),
  );
  const pathRef = useRef<TBookmark[]>([]);
  const backHistoryRef = useRef<TBookmark[]>([]);
  const forwardHistoryRef = useRef<TBookmark[]>([]);
  const totalRef = useRef<number>(0);
  const bookmarkCountRef = useRef<number>(0);
  const folderCountRef = useRef<number>(0);

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      if (tree.length == 1) {
        const { root, total, bookmarkCount, folderCount } =
          visitBookmarkTreeNode(tree[0]);
        setRootBookmark(root);
        setCurrentDirectory(root);
        pathRef.current = [root];
        totalRef.current = total;
        bookmarkCountRef.current = bookmarkCount;
        folderCountRef.current = folderCount;
      }
    });
  }, []);

  const isRoot = (): boolean => {
    if (!rootBookmark || !currentDirectory) return false;

    return currentDirectory.id == rootBookmark.id;
  };

  const isParent = (): boolean => {
    // If the current path is already the root, do nothing.
    return pathRef.current.length <= 1;
  };

  const isForwardEmpty = (): boolean => {
    return forwardHistoryRef.current.length === 0;
  };

  const isBackwardEmpty = (): boolean => {
    return backHistoryRef.current.length === 0;
  };

  const handleOnSelect = (value: string[]) => {
    // when handleOnSelect() is triggered, rootBookmark and currentDirectory are unreachable.
    if (rootBookmark === null || currentDirectory === null) return;

    if (
      checkedBookmarks.size === 1 &&
      value.length === 1 &&
      checkedBookmarks.has(value[0])
    ) {
      const selectedElement = currentDirectory.children.find(
        (c) => c.id === value[0],
      );

      if (!selectedElement) return;

      if (selectedElement?.type === "folder") {
        pathRef.current = [...pathRef.current, selectedElement];
        backHistoryRef.current.push(currentDirectory);
        setCurrentDirectory(selectedElement);
        setCheckedBookmarks(new Set());
      }
    } else {
      setCheckedBookmarks(new Set(value));
    }
  };

  const goToRoot = () => {
    // when goToRoot() is triggered, rootBookmark is unreachable.
    if (rootBookmark === null || !currentDirectory) return;

    backHistoryRef.current.push(currentDirectory);
    forwardHistoryRef.current = [];
    pathRef.current = [rootBookmark];
    setCurrentDirectory(rootBookmark);
    setCheckedBookmarks(new Set());
  };

  const goToParent = () => {
    const element = pathRef.current.pop();

    if (!element || !currentDirectory) return;

    backHistoryRef.current.push(currentDirectory);
    forwardHistoryRef.current = [];
    setCurrentDirectory(pathRef.current[pathRef.current.length - 1]);
    setCheckedBookmarks(new Set());
  };

  const goBackward = () => {
    const element = backHistoryRef.current.pop();

    if (!element || !rootBookmark || !currentDirectory) return;

    forwardHistoryRef.current.push(currentDirectory);
    pathRef.current = findPathBookmarkNode(rootBookmark, element.id)!;
    setCurrentDirectory(element);
  };

  const goForward = () => {
    const element = forwardHistoryRef.current.pop();

    if (!element || !rootBookmark || !currentDirectory) return;

    backHistoryRef.current.push(currentDirectory);
    pathRef.current = findPathBookmarkNode(rootBookmark, element.id)!;
    setCurrentDirectory(element);
  };

  return (
    <BookmarkContext.Provider
      value={{
        rootBookmark,
        currentDirectory,
        checkedBookmarks,
        handleOnSelect,
        path: pathRef.current,
        total: totalRef.current,
        bookmarkCount: bookmarkCountRef.current,
        folderCount: folderCountRef.current,
        goToParent,
        goToRoot,
        isRoot,
        isForwardEmpty,
        isParent,
        goForward,
        goBackward,
        isBackwardEmpty,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
