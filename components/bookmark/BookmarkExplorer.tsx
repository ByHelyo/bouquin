import BookmarkTable from "./BookmarkTable";
import BookmarkToolbar from "./BookmarkToolbar";
import { useBookmarks } from "@/components/provider/BookmarkProvider.tsx";
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
