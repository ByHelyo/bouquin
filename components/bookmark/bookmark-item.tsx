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
  const {
    bookmarks,
    checkedBookmarks,
    handleOnSelect,
    deleteBookmark,
    createWindow,
    openTab
  } = useBookmark();
  const { openCreationDialog } = useBookmarkDialogProvider();

  const bookmark = bookmarks[id];
  const isSelected = checkedBookmarks.has(id);

  const formatDateTime = (timestamp: number | null) => {
    if (timestamp === null) return null;
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (e.ctrlKey) {
      await handleOnSelect([...checkedBookmarks, id]);
    } else {
      await handleOnSelect([id]);
    }
  };

  if (bookmark.type === "separator") {
    return null;
  }

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
            {bookmark.type === "bookmark" && bookmark.url}
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
          onClick={() => {
            if (bookmark.type !== "separator") {
              openCreationDialog(id, bookmark.type);
            }
          }}
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => deleteBookmark(bookmark.nodeId, bookmark.id)}
        >
          Delete
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Cut</ContextMenuItem>
        <ContextMenuItem inset>Copy</ContextMenuItem>
        <ContextMenuItem inset>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          onClick={async () => {
            if (bookmark.type === "bookmark" && bookmark.url !== null) {
              await openTab(bookmark.url);
            }
          }}
        >
          Open in new window
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={async () => {
            if (bookmark.type === "bookmark" && bookmark.url !== null) {
              // Can be removed
              await createWindow({ url: bookmark.url, incognito: false });
            }
          }}
        >
          Open in new window
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={async () => {
            if (bookmark.type === "bookmark" && bookmark.url) {
              // Can be removed
              await createWindow({ url: bookmark.url, incognito: true });
            }
          }}
        >
          Open in incognito window
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default BookmarkItem;
