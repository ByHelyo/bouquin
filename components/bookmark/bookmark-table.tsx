import { useBookmarks } from "../provider/bookmark-provider.tsx";
import BookmarkItem from "./bookmark-item.tsx";
import React, { FC } from "react";

const headers: { name: string; width: number; align: "left" | "right" }[] = [
  {
    name: "Title",
    width: 35,
    align: "left",
  },
  {
    name: "Url",
    width: 40,
    align: "left",
  },
  {
    name: "Date modified",
    width: 15,
    align: "left",
  },
  {
    name: "Size",
    width: 10,
    align: "right",
  },
];

const BookmarkTable: React.FC = () => {
  const { currentDirectory, checkedBookmarks, handleOnSelect } = useBookmarks();

  if (!currentDirectory) return null;

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header.name}
              scope="col"
              className={`select-none p-2 ${index < headers.length - 1 ? "border-r border-gray-300" : ""}`}
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
  );
};

export default BookmarkTable;
