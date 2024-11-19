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
  const { setIsOpen } = useBookmarkDialogProvider();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => setIsOpen(true)}>
          New bookmark
        </ContextMenuItem>
        <ContextMenuItem inset>New folder</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
