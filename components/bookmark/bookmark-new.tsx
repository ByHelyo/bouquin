import { Button } from "@/components/ui/button.tsx";
import React from "react";

const BookmarkNew: React.FC = () => {
  const onClick = () => {};
  return (
    <Button size="lg" variant="outline" onClick={onClick}>
      New bookmark
    </Button>
  );
};

export default BookmarkNew;
