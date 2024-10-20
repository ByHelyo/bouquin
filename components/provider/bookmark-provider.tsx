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
  handleOnSelect: (value: string[]) => void;
  path: TBookmark[];
  size: number;
  goToParent: () => void;
  goToRoot: () => void;
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
  const sizeRef = useRef<number>(0);

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      if (tree.length == 1) {
        const { root, size } = visitBookmarkTreeNode(tree[0]);
        setRootBookmark(root);
        setCurrentDirectory(root);
        pathRef.current = [root];
        sizeRef.current = size;
      }
    });
  }, []);

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
    // If the path is empty, unreachable.
    if (pathRef.current.length === 0) return;

    // If the current path is already the root, do nothing.
    if (pathRef.current.length === 1) return;

    pathRef.current.pop();

    setCurrentDirectory(pathRef.current[pathRef.current.length - 1]);
    setCheckedBookmarks(new Set());
  };

  return (
    <BookmarkContext.Provider
      value={{
        rootBookmark,
        currentDirectory,
        checkedBookmarks,
        handleOnSelect,
        path: pathRef.current,
        size: sizeRef.current,
        goToParent,
        goToRoot,
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
