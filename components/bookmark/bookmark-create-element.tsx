import InputWithOverlappingLabel from "../ui/input-overlapping-label";

type TBookmarkCreateElementProps = {
  type: "bookmark" | "folder";
};

const BookmarkCreateElement: React.FC<TBookmarkCreateElementProps> = ({
  type,
}) => {
  if (type === "bookmark") {
    return (
      <div className="flex flex-col gap-y-8">
        <InputWithOverlappingLabel label="Name" />
        <InputWithOverlappingLabel label="URL" />
      </div>
    );
  }

  if (type === "folder") {
    return <InputWithOverlappingLabel label="Name" />;
  }

  return null;
};

export default BookmarkCreateElement;
