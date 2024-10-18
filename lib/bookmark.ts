import { Bookmarks } from "wxt/browser";
import { TBookmark } from "@/types/bookmark";

export const dfsBookmarks = (root: Bookmarks.BookmarkTreeNode): TBookmark => {
  let node = convertToTBookmark(root);

  if (root.children !== undefined) {
    node.children = [];

    for (const child of root.children) {
      node.children.push(dfsBookmarks(child));
    }
  }

  return node;
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
    type: node.type === "folder" || node.url !== undefined ? "bookmark" : "folder",
    children: null,
  };
}
