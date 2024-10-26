import { TBookmark } from "@/types/bookmark";
import { Bookmarks } from "wxt/browser";

export const visitBookmarkTreeNode = (
  root: Bookmarks.BookmarkTreeNode,
): {
  root: TBookmark;
  size: number;
  bookmarks_count: number;
  folder_count: number;
} => {
  let node = convertToTBookmark(root);
  let size = 0;
  let bookmarks_count = 0;
  let folder_count = 0;

  if (root.children !== undefined) {
    for (const child of root.children) {
      const { root, size: subSize } = visitBookmarkTreeNode(child);
      node.children.push(root);
      if (root.type === "bookmark") {
        bookmarks_count += 1;
      } else {
        folder_count += 1;
      }
      size += subSize + 1;
    }
  }

  return { root: node, size, bookmarks_count, folder_count };
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
