import useBookmark from "../hook/use-bookmark";
import useBookmarkDialogProvider from "../hook/use-bookmark-update-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import { cn } from "@/lib/utils";
import { File, Folder } from "lucide-react";
import React from "react";

type TBookmarkItemProps = {
  id: number;
};

const BookmarkItem: React.FC<TBookmarkItemProps> = ({ id }) => {
  const { bookmarks, checkedBookmarks, handleOnSelect } = useBookmark();
  const { openCreationDialog } = useBookmarkDialogProvider();

  const bookmark = bookmarks[id];
  const isSelected = checkedBookmarks.has(id);

  const formatDateTime = (timestamp: number | null) => {
    if (timestamp === null) return null;
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleOnClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (e.ctrlKey) {
      handleOnSelect([...checkedBookmarks, id]);
    } else {
      handleOnSelect([id]);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <tr
          className={cn(
            "select-none hover:bg-accent",
            isSelected && "bg-accent",
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
            {bookmark.type === "folder" ? bookmark.childrenIds.length : null}
          </td>
        </tr>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          onClick={() =>
            bookmark.type === "separator" || bookmark.type === null
              ? null
              : openCreationDialog(id, bookmark.type)
          }
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem inset>Delete</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Cut</ContextMenuItem>
        <ContextMenuItem inset>Copy</ContextMenuItem>
        <ContextMenuItem inset>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Open in new tab</ContextMenuItem>
        <ContextMenuItem inset>Open in new window</ContextMenuItem>
        <ContextMenuItem inset>Open in incognito window</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default BookmarkItem;
