import { TBookmark } from "@/types/bookmark";
import React from "react";
import { File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

type TBookmarkItemProps = {
  bookmark: TBookmark;
  selected: boolean;
  setBookmark: (bookmark: TBookmark) => void;
};

const BookmarkItem: React.FC<TBookmarkItemProps> = ({
  bookmark,
  selected,
  setBookmark,
}) => {
  const formatDateTime = (timestamp: number | null) => {
    if (timestamp === null) return null;
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const goTo = () => {
    if (bookmark.type === "folder") {
      setBookmark(bookmark);
    }
  };

  return (
    <tr
      className={cn("select-none hover:bg-gray-100", selected && "bg-gray-200")}
      onClick={goTo}
    >
      <td className="px-2 py-1 flex items-center text-left">
        {bookmark.type === "folder" ? (
          <Folder
            className="w-[24px] mr-3 shrink-0"
            fill="yellow"
            strokeWidth={0}
          />
        ) : (
          <File
            className="w-[24px] mr-3 shrink-0"
            fill="gray"
            strokeWidth={0}
          />
        )}
        <span className="font-medium text-gray-800 text-left truncate">
          {bookmark.title}
        </span>
      </td>
      <td className="px-2 py-1 text-gray-500 text-left truncate">
        {bookmark.url}
      </td>
      <td className="px-2 py-1 text-gray-500 text-left">
        {bookmark.lastModified !== null
          ? formatDateTime(bookmark.lastModified)
          : null}
      </td>
      <td className="px-2 py-1 text-gray-500 text-left">{bookmark.type}</td>
      <td className="px-2 py-1 text-gray-500 text-right">
        {bookmark.children?.length || 0}
      </td>
    </tr>
  );
};

export default BookmarkItem;
