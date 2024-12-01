export type TBookmark = {
  id: number;
  nodeId: string;
  parentId: string | null;
  index: number | null;
  url: string | null;
  title: string;
  dateAdded: number | null;
  lastModified: number | null;
  unmodifiable: boolean;
  type: "bookmark" | "folder" | "separator";
  childrenIds: number[];
};
