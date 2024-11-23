import useBookmark from "../hook/use-bookmark";
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
    bookmarks,
    path,
    goToParent,
    goToRoot,
    goForward,
    isForwardEmpty,
    goBackward,
    isBackwardEmpty,
    isRoot,
  } = useBookmark();

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={goBackward}
        disabled={isBackwardEmpty()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={goForward}
        disabled={isForwardEmpty()}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={goToParent}
        disabled={isRoot()}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {path.map((id, index) => {
            if (index === 0)
              return (
                <BreadcrumbItem>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={goToRoot}
                    disabled={isRoot()}
                    key={id}
                  >
                    <Layers3 className="h-4 w-4" />
                  </Button>
                </BreadcrumbItem>
              );

            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={id}>
                  <Button variant="ghost" size="sm">
                    {bookmarks[id].title}
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
