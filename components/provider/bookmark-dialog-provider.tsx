import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import InputWithOverlappingLabel from "../ui/input-overlapping-label";
import { createContext } from "react";

export const BookmarkDialogContext = createContext<TBookmarkDialogContext>({
  isOpen: false,
  setIsOpen: () => {},
});

type TBookmarkDialogContext = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type TBookmarkDialogProviderProps = {
  children: React.ReactNode;
};

export const BookmarkDialogProvider: React.FC<TBookmarkDialogProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookmarkDialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
    </BookmarkDialogContext.Provider>
  );
};
