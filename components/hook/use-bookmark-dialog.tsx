import { BookmarkDialogContext } from "@/components/provider/bookmark-dialog-provider";
import { useContext } from "react";

const useBookmarkDialogProvider = () => {
  const context = useContext(BookmarkDialogContext);
  if (!context) {
    throw new Error(
      "useBookmarkDialogProvider must be used within a BookmarkDialogProvider",
    );
  }
  return context;
};

export default useBookmarkDialogProvider;
