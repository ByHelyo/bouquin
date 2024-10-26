import { TBookmark } from "@/types/bookmark";
import { Bookmarks } from "wxt/browser";

export const visitBookmarkTreeNode = (
  root: Bookmarks.BookmarkTreeNode,
): {
  root: TBookmark;
  total: number;
  bookmarkCount: number;
  folderCount: number;
  separatorCount: number;
} => {
  let node = convertToTBookmark(root);
  let total = 0;
  let bookmarkCount = 0;
  let folderCount = 0;
  let separatorCount = 0;

  if (root.children !== undefined) {
    for (const child of root.children) {
      const {
        root: subRoot,
        total: subTotal,
        bookmarkCount: subBookmarkCount,
        folderCount: subFolderCount,
        separatorCount: subSeparatorCount,
      } = visitBookmarkTreeNode(child);
      node.children.push(subRoot);
      bookmarkCount += subBookmarkCount;
      folderCount += subFolderCount;
      separatorCount += subSeparatorCount;

      if (subRoot.type === "bookmark") {
        bookmarkCount += 1;
      } else if (subRoot.type === "folder") {
        folderCount += 1;
      } else if (subRoot.type === "separator") {
        separatorCount += 1;
      }
      total += subTotal + 1;
    }
  }
  return { root: node, total, bookmarkCount, folderCount, separatorCount };
};

function convertToTBookmark(node: Bookmarks.BookmarkTreeNode): TBookmark {
  return {
    id: node.id,
    parentId: node.parentId || null,
    index: node.index || null,
    url: node.url || null,
    title: node.title,
    dateAdded: node.dateAdded || null,
    lastModified: node.dateAdded || null,
    unmodifiable: !!node.unmodifiable,
    type:
      node.type === "folder" || node.url === undefined ? "folder" : "bookmark",
    children: [],
  };
}
