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
        "select-none hover:bg-blue-100",
        isSelected && "bg-blue-200 hover:bg-blue-200",
      )}
      onClick={handleOnClick}
    >
      <td className="flex items-center px-2 py-1 text-left">
        {bookmark.type === "folder" ? (
          <Folder
            className="mr-3 w-[24px] shrink-0"
            fill="yellow"
            strokeWidth={0}
          />
        ) : (
          <File
            className="mr-3 w-[24px] shrink-0"
            fill="gray"
            strokeWidth={0}
          />
        )}
        <span className="truncate text-left font-medium text-gray-800">
          {bookmark.title}
        </span>
      </td>
      <td className="truncate px-2 py-1 text-left text-gray-500">
        {bookmark.url}
      </td>
      <td className="px-2 py-1 text-left text-gray-500">
        {bookmark.lastModified !== null
          ? formatDateTime(bookmark.lastModified)
          : null}
      </td>
      <td className="px-2 py-1 text-left text-gray-500">{bookmark.type}</td>
      <td className="px-2 py-1 text-right text-gray-500">
        {bookmark.children === null ? null : bookmark.children.length}
      </td>
    </tr>
  );
};

export default BookmarkItem;
