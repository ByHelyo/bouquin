import BookmarkCreateElement from "../bookmark/bookmark-create-element";
import useChromeBookmark from "../hook/use-chrome-bookmark";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { createContext } from "react";
import { toast } from "sonner";

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
  const { createBookmark } = useChromeBookmark();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"bookmark" | "folder">("bookmark");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const openCreationDialog = (tab: "bookmark" | "folder") => {
    setTab(tab);
    setIsOpen(true);
  };

  const handleSave = () => {
    createBookmark({ name, url, type: tab })
      .then(() => {
        setUrl("");
        setName("");
        setIsOpen(false);
        toast.success("Bookmark created");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <BookmarkDialogContext.Provider value={{ isOpen, openCreationDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New</DialogTitle>
          </DialogHeader>
          <div className="flex h-48 flex-col justify-between">
            <Tabs
              defaultValue="bookmark"
              value={tab}
              onValueChange={(value) => setTab(value as "bookmark" | "folder")}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="bookmark">Bookmark</TabsTrigger>
                <TabsTrigger value="folder">Folder</TabsTrigger>
              </TabsList>
              <TabsContent value="bookmark">
                <BookmarkCreateElement
                  type="bookmark"
                  name={name}
                  setName={setName}
                  url={url}
                  setUrl={setUrl}
                />
              </TabsContent>
              <TabsContent value="folder">
                <BookmarkCreateElement
                  type="folder"
                  name={name}
                  setName={setName}
                  url={url}
                  setUrl={setUrl}
                />
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              variant="outline"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BookmarkDialogContext.Provider>
  );
};
