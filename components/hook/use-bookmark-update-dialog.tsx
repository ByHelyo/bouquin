import BookmarkUpdateDialogContext from "../context/bookmark-update-dialog-context";
import { useContext } from "react";

const useBookmarkUpdateDialogProvider = () => {
  const context = useContext(BookmarkUpdateDialogContext);
  if (!context) {
    throw new Error(
      "useBookmarkDialogProvider must be used within a BookmarkDialogProvider",
    );
  }
  return context;
};

export default useBookmarkUpdateDialogProvider;
