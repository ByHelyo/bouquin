import Logo from "./logo";
import BookmarkNew from "@/components/bookmark/bookmark-new.tsx";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <div className="flex w-[260px] flex-col gap-y-2 border-r border-border p-2">
      <Logo />
      <BookmarkNew />
    </div>
  );
};

export default Navigation;
