export const chromeCreateBookmark = async (
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
