import { ChromeBookmarkContext } from "@/components/provider/chrome-bookmark-provider.tsx";
import { useContext } from "react";

const useChromeBookmark = () => {
  const context = useContext(ChromeBookmarkContext);
  if (!context) {
    throw new Error("useChromeBookmark must be used within a BookmarkProvider");
  }
  return context;
};

export default useChromeBookmark;
