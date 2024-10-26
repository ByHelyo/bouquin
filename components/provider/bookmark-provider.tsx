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
  handleOnSelect: (value: string[]) => void;
  goToRoot: () => void;
  goToParent: () => void;
  goForward: () => void;
  isForwardEmpty: () => boolean;
  isParentEmpty: () => boolean;
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
  const forwardPathRef = useRef<TBookmark[]>([]);
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

  const isForwardEmpty = (): boolean => {
    return forwardPathRef.current.length === 0;
  };

  const isParentEmpty = (): boolean => {
    // If the current path is already the root, do nothing.
    return pathRef.current.length <= 1;
  };

  const handleOnSelect = (value: string[]) => {
    // when handleOnSelect() is triggered, rootBookmark and currentDirectory are unreachable.
    if (rootBookmark === null || currentDirectory === null) return;

    if (
      checkedBookmarks.size === 1 &&
      value.length === 1 &&
      checkedBookmarks.has(value[0])
    ) {
      const selectedBookmark = currentDirectory.children.find(
        (c) => c.id === value[0],
      );

      if (selectedBookmark?.type === "folder") {
        pathRef.current = [...pathRef.current, selectedBookmark];
        setCurrentDirectory(selectedBookmark);
        setCheckedBookmarks(new Set());
        return;
      }
    }

    setCheckedBookmarks(new Set(value));
  };

  const goToRoot = () => {
    // when goToRoot() is triggered, rootBookmark is unreachable.
    if (rootBookmark === null) return;

    setCurrentDirectory(rootBookmark);
    pathRef.current = [rootBookmark];
    setCheckedBookmarks(new Set());
  };

  const goToParent = () => {
    if (isParentEmpty()) return;

    pathRef.current.pop();

    forwardPathRef.current.push(pathRef.current[pathRef.current.length - 1]);
    setCurrentDirectory(pathRef.current[pathRef.current.length - 1]);
    setCheckedBookmarks(new Set());
  };

  const goForward = () => {
    if (isForwardEmpty()) return;

    pathRef.current.push(forwardPathRef.current.pop()!);
    setCurrentDirectory(pathRef.current[pathRef.current.length - 1]);
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
        goForward,
        isForwardEmpty,
        isParentEmpty,
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
