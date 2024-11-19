import BookmarkCreateElement from "../bookmark/bookmark-create-element";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import InputWithOverlappingLabel from "../ui/input-overlapping-label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { createContext } from "react";

export const BookmarkDialogContext = createContext<TBookmarkDialogContext>({
  isOpen: false,
  openCreationDialog: () => {},
});

type TBookmarkDialogContext = {
  isOpen: boolean;
  openCreationDialog: (tab: "bookmark" | "folder") => void;
};

type TBookmarkDialogProviderProps = {
  children: React.ReactNode;
};

export const BookmarkDialogProvider: React.FC<TBookmarkDialogProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<string>("bookmark");

  const openCreationDialog = (tab: "bookmark" | "folder") => {
    setTab(tab);
    setIsOpen(true);
  };

  return (
    <BookmarkDialogContext.Provider value={{ isOpen, openCreationDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex h-64 flex-col justify-between">
          <Tabs defaultValue="bookmark" value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="bookmark">Bookmark</TabsTrigger>
              <TabsTrigger value="folder">Folder</TabsTrigger>
            </TabsList>
            <TabsContent value="bookmark">
              <BookmarkCreateElement type="bookmark" />
            </TabsContent>
            <TabsContent value="folder">
              <BookmarkCreateElement type="folder" />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button
              size="sm"
              variant="outline"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
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
