import BookmarkContext from "../context/bookmark-context";
import { findPathBookmarkNode } from "@/lib/bookmark/find";
import { convertToTBookmark } from "@/lib/bookmark/treenode.ts";
import {
  browserCreateBookmark,
  browserDeleteBookmark,
  browserGetTree,
  browserUpdateBookmark,
} from "@/lib/browser.ts";
import { TBookmark } from "@/types/bookmark";
import {
  TBookmarkAction,
  TCreateBookmarkDetails,
  TCreateWindowDetails,
  TEditBookmarkDetails,
} from "@/types/bookmark-provider";
import React, { useState, useEffect, useRef, useReducer, Reducer } from "react";
import { Bookmarks, browser } from "wxt/browser";

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
    browserGetTree().then((details) => {
      dispatch({ type: "initialization", bookmarks: details.newestBookmarks });
      pathRef.current = [0];
      totalRef.current = details.total;
      bookmarkCountRef.current = details.bookmarkCount;
      folderCountRef.current = details.folderCount;
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

  const handleOnSelect = async (selectedIds: number[]) => {
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
          if (selectedElement.url) {
            await openTab(selectedElement.url);
          }
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
    return browserCreateBookmark(
      bookmarks[currentFolderId].nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      dispatch({ type: "creation", bookmark: bookmarkTreeNode });
    });
  };

  const editBookmark = async (details: TEditBookmarkDetails): Promise<void> => {
    return browserUpdateBookmark(
      details.nodeId,
      details.name,
      details.url || undefined,
    ).then((bookmarkTreeNode) => {
      dispatch({ type: "edition", bookmark: bookmarkTreeNode });
    });
  };

  const deleteBookmark = async (nodeId: string, id: number) => {
    return browserDeleteBookmark(nodeId).then(() => {
      dispatch({ type: "deletion", id });
      pathRef.current = findPathBookmarkNode(bookmarks, 0, currentFolderId)!;
      backHistoryRef.current = [];
      forwardHistoryRef.current = [];
      setCheckedBookmarks(new Set());
    });
  };

  const createWindow = async (details: TCreateWindowDetails) => {
    await browser.windows.create({
      url: details.url,
      incognito: details.incognito || false,
    });
  };

  const openTab = async (url: string) => {
    await browser.tabs.create({ url });
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
        deleteBookmark,
        createWindow,
        openTab,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

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
    case "deletion":
      let removedIds: number[] = [];

      const findAllIdsSubtree = (id: number) => {
        removedIds.push(id);
        if (bookmarks[id].childrenIds.length != 0) {
          for (const subId of bookmarks[id].childrenIds) {
            findAllIdsSubtree(subId);
          }
        }
      };

      findAllIdsSubtree(action.id);
      let oldIds: Map<number, string> = new Map();
      let newIds: Map<string, number> = new Map();

      for (const bookmark of bookmarks) {
        oldIds.set(bookmark.id, bookmark.nodeId);
      }

      newBookmarksList = bookmarks.filter((b) => {
        return !removedIds.includes(b.id);
      });

      for (const bookmark of newBookmarksList) {
        newIds.set(bookmark.nodeId, bookmark.id);
      }

      for (let i = 0; i < newBookmarksList.length; i++) {
        newIds.set(newBookmarksList[i].nodeId, i);
      }

      newBookmarksList = newBookmarksList.map((b, index) => {
        if (b.childrenIds.length != 0) {
          const newChildrenIds: number[] = [];

          for (const subId of b.childrenIds) {
            let oldId = oldIds.get(subId)!;
            let newId = newIds.get(oldId);

            if (newId != undefined) {
              newChildrenIds.push(newId);
            }
          }

          return {
            ...b,
            id: index,
            childrenIds: newChildrenIds,
          };
        }
        return {
          ...b,
          id: index,
        };
      });
      break;
  }

  return newBookmarksList;
};

export default BookmarkProvider;
