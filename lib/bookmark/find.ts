import { TBookmark } from "@/types/bookmark";

export const findPathBookmarkNode = (
  root: TBookmark,
  id: string,
): TBookmark[] | null => {
  if (root === null) {
    return null;
  }

  if (root.id === id) {
    return [root];
  }

  for (const child of root.children) {
    const result = findPathBookmarkNode(child, id);

    if (result !== null) {
      return [root, ...result];
    }
  }

  return null;
};
