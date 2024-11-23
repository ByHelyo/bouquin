import useBookmarkDialogProvider from "../hook/use-bookmark-update-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import React from "react";

type TBookmarkExplorerProviderProps = {
  children: React.ReactNode;
};

const BookmarkExplorerContext: React.FC<TBookmarkExplorerProviderProps> = ({
  children,
}) => {
  const { openCreationDialog } = useBookmarkDialogProvider();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          onClick={() => openCreationDialog(null, "bookmark")}
        >
          New bookmark
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => openCreationDialog(null, "folder")}
        >
          New folder
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default BookmarkExplorerContext;
