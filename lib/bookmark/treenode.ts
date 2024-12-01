import { TBookmark } from "@/types/bookmark";
import { Bookmarks } from "wxt/browser";

export const buildBookmarkTree = (
  root: Bookmarks.BookmarkTreeNode,
  bookmarks: TBookmark[],
  id: number[],
) => {
  let node = convertToTBookmark(root, id[0]);
  ++id[0];

  bookmarks.push(node);

  let total = 0;
  let bookmarkCount = 0;
  let folderCount = 0;
  let separatorCount = 0;

  if (root.children != undefined) {
    for (const child of root.children) {
      const childResult = buildBookmarkTree(child, bookmarks, id);
      node.childrenIds.push(childResult.id);

      bookmarkCount += childResult.bookmarkCount;
      folderCount += childResult.folderCount;
      separatorCount += childResult.separatorCount;
      total += childResult.total + 1;

      switch (bookmarks[childResult.id].type) {
        case "folder":
          folderCount += 1;
          break;
        case "bookmark":
          bookmarkCount += 1;
          break;
        case "separator":
          separatorCount += 1;
          break;
      }
    }
  }

  return {
    id: node.id,
    total,
    bookmarkCount,
    folderCount,
    separatorCount,
  };
};

export const convertToTBookmark = (
  node: Bookmarks.BookmarkTreeNode,
  id: number,
): TBookmark => {
  return {
    id: id,
    nodeId: node.id,
    parentId: node.parentId || null,
    index: node.index || null,
    url: node.url || null,
    title: node.title,
    dateAdded: node.dateAdded || null,
    lastModified: node.dateAdded || null,
    unmodifiable: !!node.unmodifiable,
    type:
      node.type !== undefined
        ? node.type
        : node.url !== undefined
          ? "bookmark"
          : "folder",
    childrenIds: [],
  };
};
