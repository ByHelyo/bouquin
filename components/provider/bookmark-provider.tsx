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
        sizeRef.current = size;
      }
    });
  }, []);

  const handleOnSelect = (value: string[]) => {
    if (!currentDirectory) return;

    if (
      checkedBookmarks.size === 1 &&
      value.length === 1 &&
      checkedBookmarks.has(value[0])
    ) {
      const selectedBookmark = currentDirectory?.children?.find(
        (c) => c.id === value[0],
      );

      if (selectedBookmark?.type === "folder") {
        pathRef.current = [...pathRef.current, currentDirectory];
        setCurrentDirectory(selectedBookmark);
        setCheckedBookmarks(new Set());
        return;
      }
    }

    setCheckedBookmarks(new Set(value));
  };

  const goToRoot = () => {
    setCurrentDirectory(rootBookmark);
    pathRef.current = [];
    setCheckedBookmarks(new Set());
  };

  const goToParent = () => {
    const parent = pathRef.current.pop();
    if (parent) {
      setCurrentDirectory(parent);
    } else {
      setCurrentDirectory(rootBookmark);
    }
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
