import { useBookmarks } from "../provider/BookmarkProvider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight, Layers, Layers3 } from "lucide-react";
import React from "react";

const BookmarkToolbar: React.FC = () => {
  const { currentDirectory, path } = useBookmarks();

  if (!currentDirectory) return null;

  return (
    <div className="mb-4 flex items-center gap-x-4">
      <Button size="icon" variant="icon">
        <ArrowLeft size={20} />
      </Button>
      <Button size="icon" variant="icon">
        <ArrowRight size={20} />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button variant="icon" size="icon">
              <Layers3 size={20} />
            </Button>
          </BreadcrumbItem>
          {path.map((item) => (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={item.id}>
                <span className="cursor-pointer hover:underline">
                  {item?.title}
                </span>
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BookmarkToolbar;
