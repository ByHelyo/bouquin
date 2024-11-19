import useBookmarkDialogProvider from "../hook/use-bookmark-dialog";
import { Button } from "@/components/ui/button.tsx";
import React from "react";

const BookmarkNew: React.FC = () => {
  const { setIsOpen } = useBookmarkDialogProvider();

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <Button size="lg" variant="outline" onClick={onClick}>
      New bookmark
    </Button>
  );
};

export default BookmarkNew;
