import { useState, useEffect } from "react";
import "./App.css";
import { Bookmarks, browser } from "wxt/browser";

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    async function fetchBookmarks() {
      const tree = await browser.bookmarks.getTree();
      setBookmarks(tree);
    }

    fetchBookmarks();
  }, []);

  return <main className="w-full h-full bg-red-500">Hello world!</main>;
}

export default App;
