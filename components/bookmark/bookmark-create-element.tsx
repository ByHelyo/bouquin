import InputWithOverlappingLabel from "../ui/input-overlapping-label";

type TBookmarkCreateElementProps = {
  type: "bookmark" | "folder";
  name: string;
  setName: (name: string) => void;
  url: string;
  setUrl: (url: string) => void;
};

const BookmarkCreateElement: React.FC<TBookmarkCreateElementProps> = ({
  type,
  name,
  setName,
  url,
  setUrl,
}) => {
  return (
    <div className="flex flex-col gap-y-8">
      <InputWithOverlappingLabel
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {type === "bookmark" && (
        <InputWithOverlappingLabel
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}
    </div>
  );
};

export default BookmarkCreateElement;
