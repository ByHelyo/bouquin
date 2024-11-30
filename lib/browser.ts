import { buildBookmarkTree } from "@/lib/bookmark/treenode.ts";
import { TBookmark } from "@/types/bookmark";

export const browserGetTree = async () => {
  return browser.bookmarks.getTree().then((tree) => {
    if (tree.length != 1) return Promise.reject("Tree is incorrect");

    const newestBookmarks: TBookmark[] = [];
    const { total, bookmarkCount, folderCount } = buildBookmarkTree(
      tree[0],
      newestBookmarks,
      [0],
    );

    return { newestBookmarks, total, bookmarkCount, folderCount };
  });
};

export const browserCreateBookmark = async (
  directoryId: string,
  name: string,
  url: string | undefined,
) => {
  return await browser.bookmarks.create({
    title: name,
    url,
    parentId: directoryId,
  });
};

export const browserUpdateBookmark = async (
  nodeId: string,
  name: string,
  url: string | undefined,
) => {
  return await browser.bookmarks.update(nodeId, { title: name, url });
};

export const browserDeleteBookmark = async (nodeId: string) => {
  return await browser.bookmarks.removeTree(nodeId);
};
