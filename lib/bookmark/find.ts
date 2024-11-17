import { TBookmark } from "@/types/bookmark";

export const findPathBookmarkNode = (
  bookmarks: TBookmark[],
  currentId: number,
  target: number,
): number[] | null => {
  if (currentId >= bookmarks.length) {
    return null;
  }

  if (target == currentId) {
    return [currentId];
  }

  for (const child of bookmarks[currentId].childrenIds) {
    const result = findPathBookmarkNode(bookmarks, child, target);

    if (result !== null) {
      return [currentId, ...result];
    }
  }

  return null;
};
