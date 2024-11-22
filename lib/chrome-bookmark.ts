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

export const chromeUpdateBookmark = async (
  nodeId: string,
  name: string,
  url: string | undefined,
) => {
  return await browser.bookmarks.update(nodeId, { title: name, url });
};
