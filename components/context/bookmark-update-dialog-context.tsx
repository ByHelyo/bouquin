import { createContext } from "react";

type TBookmarkUpdateDialogContext = {
  isOpen: boolean;
  openCreationDialog: (id: number | null, tab: "bookmark" | "folder") => void;
};

const BookmarkUpdateDialogContext =
  createContext<TBookmarkUpdateDialogContext | null>(null);

export default BookmarkUpdateDialogContext;
