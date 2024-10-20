import BookmarkTable from "./bookmark-table.tsx";
import BookmarkToolbar from "./bookmark-toolbar.tsx";
import { useBookmarks } from "@/components/provider/bookmark-provider.tsx";
import React from "react";

const BookmarkExplorer: React.FC = () => {
  const { currentDirectory } = useBookmarks();

  if (!currentDirectory || currentDirectory.children === null) return null;

  return (
    <div className="flex flex-1 flex-col p-4">
      <BookmarkToolbar />
      <BookmarkTable />
    </div>
  );
};

export default BookmarkExplorer;
