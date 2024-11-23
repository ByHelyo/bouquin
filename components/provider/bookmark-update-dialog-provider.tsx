import BookmarkCreateElement from "../bookmark/bookmark-create-element";
import BookmarkUpdateDialogContext from "../context/bookmark-update-dialog-context";
import useChromeBookmark from "../hook/use-bookmark";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

type TBookmarkUpdateDialogProviderProps = {
  children: React.ReactNode;
};

const BookmarkUpdateDialogProvider: React.FC<
  TBookmarkUpdateDialogProviderProps
> = ({ children }) => {
  const { bookmarks, createBookmark, editBookmark } = useChromeBookmark();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [tab, setTab] = useState<"bookmark" | "folder">("bookmark");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const nodeId = id !== null ? bookmarks[id].nodeId : null;

  const openCreationDialog = (
    id: number | null,
    tab: "bookmark" | "folder",
  ) => {
    if (id !== null) {
      setName(bookmarks[id].title);
      setUrl(bookmarks[id].url ?? "");
    }
    setTab(tab);
    setId(id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (nodeId !== null) {
      editBookmark({ nodeId, name, url })
        .then(() => {
          setUrl("");
          setName("");
          setIsOpen(false);
          toast.success("Bookmark updated");
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      createBookmark({ name, url })
        .then(() => {
          setUrl("");
          setName("");
          setIsOpen(false);
          toast.success("Bookmark created");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <BookmarkUpdateDialogContext.Provider
      value={{ isOpen, openCreationDialog }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {nodeId ? "Edit" : "Create"}{" "}
              {tab === "bookmark" ? "Bookmark" : "Folder"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex h-48 flex-col justify-between">
            <Tabs
              defaultValue="bookmark"
              value={tab}
              onValueChange={(value) => setTab(value as "bookmark" | "folder")}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="bookmark" disabled={nodeId !== null}>
                  Bookmark
                </TabsTrigger>
                <TabsTrigger value="folder" disabled={nodeId !== null}>
                  Folder
                </TabsTrigger>
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
    </BookmarkUpdateDialogContext.Provider>
  );
};

export default BookmarkUpdateDialogProvider;
