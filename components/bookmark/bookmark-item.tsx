import { cn } from "@/lib/utils";
import { TBookmark } from "@/types/bookmark";
import { File, Folder } from "lucide-react";
import React from "react";

type TBookmarkItemProps = {
  bookmark: TBookmark;
  isSelected: boolean;
  handleOnSelect: (selectedBookmarks: string[]) => void;
};

const BookmarkItem: React.FC<TBookmarkItemProps> = ({
  bookmark,
  isSelected,
  handleOnSelect,
}) => {
  const formatDateTime = (timestamp: number | null) => {
    if (timestamp === null) return null;
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleOnClick = () => {
    handleOnSelect([bookmark.id]);
  };

  return (
    <tr
      className={cn(
        "select-none text-xs ring-1 ring-transparent hover:bg-blue-100",
        isSelected && "bg-blue-200 ring-blue-300 hover:bg-blue-200",
      )}
      onClick={handleOnClick}
    >
      <td className="flex items-center px-1 py-0.5 text-left">
        {bookmark.type === "folder" ? (
          <Folder
            className="mr-2 w-[16px] shrink-0"
            fill="yellow"
            strokeWidth={0}
          />
        ) : (
          <File
            className="mr-2 w-[16px] shrink-0"
            fill="gray"
            strokeWidth={0}
          />
        )}
        <span className="truncate text-left font-medium text-foreground">
          {bookmark.title}
        </span>
      </td>
      <td className="truncate px-2 py-1 text-left text-muted-foreground">
        {bookmark.url}
      </td>
      <td className="px-2 py-1 text-left text-muted-foreground">
        {bookmark.lastModified !== null
          ? formatDateTime(bookmark.lastModified)
          : null}
      </td>
      <td className="px-2 py-1 text-right text-muted-foreground">
        {bookmark.type === "folder" ? bookmark.children.length : null}
      </td>
    </tr>
  );
};

export default BookmarkItem;
