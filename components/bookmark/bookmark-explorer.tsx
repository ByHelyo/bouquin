import BookmarkTable from "./bookmark-table.tsx";
import BookmarkToolbar from "./bookmark-toolbar.tsx";
import React from "react";

const BookmarkExplorer: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col p-4">
      <BookmarkToolbar />
      <BookmarkTable />
    </div>
  );
};

export default BookmarkExplorer;
