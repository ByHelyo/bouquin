import useBookmarkDialogProvider from "../hook/use-bookmark-dialog";
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

export const BookmarkCreateContext: React.FC<
  TBookmarkExplorerProviderProps
> = ({ children }) => {
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
