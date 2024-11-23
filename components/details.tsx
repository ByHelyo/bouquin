import useBookmark from "./hook/use-bookmark";
import StatisticItem from "./statistic-item";
import React from "react";

const Details: React.FC = () => {
  const { total, bookmarkCount, folderCount } = useBookmark();

  return (
    <div className="hidden w-[260px] select-none flex-col gap-y-4 border-l border-border p-2 2xl:flex">
      <StatisticItem label="Total" value={`${total}`} />
      <StatisticItem label="Bookmarks" value={`${bookmarkCount}`} />
      <StatisticItem label="Folders" value={`${folderCount}`} />
    </div>
  );
};

export default Details;
