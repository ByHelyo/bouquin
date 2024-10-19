import { useBookmarks } from "../provider/BookmarkProvider";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight, ChevronRight as Chevron } from "lucide-react";
import React from "react";

const BookmarkToolbar: React.FC = () => {
  const { currentDirectory } = useBookmarks();

  if (!currentDirectory) return null;

  return (
    <div className="mb-4 flex items-center">
      <Button size="icon" variant="icon" className="mr-2">
        <ArrowLeft size={16} strokeWidth={3} />
      </Button>
      <Button size="icon" variant="icon" className="mr-4">
        <ArrowRight size={16} strokeWidth={3} />
      </Button>
      <div className="border-1 flex items-center border-black">
        {[currentDirectory].map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Chevron size={16} className="mx-1" />}
            <span className="cursor-pointer hover:underline">
              {item?.title}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookmarkToolbar;
