import { convertToTBookmark } from "./bookmark/treenode";
import { TBookmark } from "@/types/bookmark";

export const chromeCreateBookmark = async (
  directoryId: string,
  name: string,
  url: string | undefined,
  type: "bookmark" | "folder",
) => {
  return await browser.bookmarks.create({
    title: name,
    url,
    parentId: directoryId,
  });
};
