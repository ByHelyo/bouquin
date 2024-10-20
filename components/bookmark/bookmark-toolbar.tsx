import { useBookmarks } from "../provider/bookmark-provider.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight, ArrowUp, Layers3 } from "lucide-react";
import React from "react";

const BookmarkToolbar: React.FC = () => {
  const { currentDirectory, path, goToParent, goToRoot } = useBookmarks();

  if (!currentDirectory) return null;

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <Button size="icon" variant="icon">
        <ArrowLeft size={20} />
      </Button>
      <Button size="icon" variant="icon">
        <ArrowRight size={20} />
      </Button>
      <Button size="icon" variant="icon" onClick={goToParent}>
        <ArrowUp size={20} />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((item, index) => {
            if (index === 0)
              return (
                <BreadcrumbItem>
                  <Button variant="icon" size="icon" onClick={goToRoot}>
                    <Layers3 size={20} />
                  </Button>
                </BreadcrumbItem>
              );

            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={item.id}>
                  <span className="cursor-pointer hover:underline">
                    {item?.title}
                  </span>
                </BreadcrumbItem>
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BookmarkToolbar;
