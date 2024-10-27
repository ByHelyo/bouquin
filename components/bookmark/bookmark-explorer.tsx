import BookmarkTable from "./bookmark-table.tsx";
import BookmarkToolbar from "./bookmark-toolbar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import React from "react";

const BookmarkExplorer: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-1 p-2">
      <BookmarkToolbar />
      <Separator />
      <BookmarkTable />
    </div>
  );
};

export default BookmarkExplorer;
