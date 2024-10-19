import { TBookmark } from "@/types/bookmark";
import React from "react";
import BookmarkItem from "./BookmarkItem";
import {useBookmarks} from "@/components/provider/BookmarkProvider.tsx";

const headers: { name: string; width: number; align: "left" | "right" }[] = [
  {
    name: "Title",
    width: 20,
    align: "left",
  },
  {
    name: "Url",
    width: 40,
    align: "left",
  },
  {
    name: "Date modified",
    width: 20,
    align: "left",
  },
  {
    name: "Type",
    width: 10,
    align: "left",
  },
  {
    name: "Size",
    width: 10,
    align: "right",
  },
];

const BookmarkExplorer: React.FC = ({
}) => {
  const {currentDirectory, checkedBookmarks, handleOnSelect } = useBookmarks();

  if (!currentDirectory || currentDirectory.children === null) return null;

  return (
    <div className="flex-1 p-4">
      <table className="table-fixed w-full">
        <thead className="mb-2">
          <tr>
            {headers.map((header) => (
              <th
                key={header.name}
                scope="col"
                className="p-2 select-none"
                style={{ width: `${header.width}%`, textAlign: header.align }}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentDirectory.children.map((child) => (
            <BookmarkItem
              key={child.id}
              bookmark={child}
              isSelected={checkedBookmarks.has(child.id)}
              handleOnSelect={handleOnSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookmarkExplorer;
