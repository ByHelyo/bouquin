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
  const {
    currentDirectory,
    path,
    goToParent,
    goToRoot,
    goForward,
    isForwardEmpty,
    isParentEmpty,
  } = useBookmarks();

  if (!currentDirectory) return null;

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <Button
        size="icon"
        variant="icon"
        onClick={goToParent}
        disabled={isParentEmpty()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="icon"
        onClick={goForward}
        disabled={isForwardEmpty()}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="icon" onClick={goToParent}>
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((item, index) => {
            if (index === 0)
              return (
                <BreadcrumbItem>
                  <Button size="icon" variant="icon" onClick={goToRoot}>
                    <Layers3 className="h-4 w-4" />
                  </Button>
                </BreadcrumbItem>
              );

            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={item.id}>
                  <Button variant="ghost" size="sm">
                    {item?.title}
                  </Button>
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
