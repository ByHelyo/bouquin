import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import InputWithOverlappingLabel from "@/components/ui/input-overlapping-label.tsx";
import React from "react";

const BookmarkNew: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const onClick = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" onClick={onClick}>
          New bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New bookmark</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-8">
          <InputWithOverlappingLabel label="Name" />
          <InputWithOverlappingLabel label="URL" />
        </div>
        <DialogFooter>
          <Button size="sm" variant="outline" type="submit">
            Cancel
          </Button>
          <Button size="sm" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkNew;
