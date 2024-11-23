import BookmarkContext from "../context/bookmark-context";
import { useContext } from "react";

const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
};

export default useBookmark;
