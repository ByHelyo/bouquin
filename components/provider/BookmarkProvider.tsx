import { dfsBookmark } from "@/lib/bookmark";
import { TBookmark } from "@/types/bookmark";
import React, { createContext, useContext, useState, useEffect } from "react";
import { browser } from "wxt/browser";

const BookmarkContext = createContext<{
  rootBookmark: TBookmark | null;
  currentDirectory: TBookmark | null;
  checkedBookmarks: Set<string>;
  handleOnSelect: (value: string[]) => void;
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

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      if (tree.length === 1) {
        const root = dfsBookmark(tree[0]);
        setRootBookmark(root);
        setCurrentDirectory(root);
      }
    });
  }, []);

  const handleOnSelect = (value: string[]) => {
    if (
      checkedBookmarks.size === 1 &&
      value.length === 1 &&
      checkedBookmarks.has(value[0])
    ) {
      const selectedBookmark = currentDirectory?.children?.filter(
        (c) => c.id === value[0],
      )[0];

      if (!selectedBookmark) return;

      if (selectedBookmark.type === "folder")
        setCurrentDirectory(selectedBookmark);
      return;
    }

    setCheckedBookmarks(new Set(value));
  };

  return (
    <BookmarkContext.Provider
      value={{
        rootBookmark,
        currentDirectory,
        checkedBookmarks,
        handleOnSelect,
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
