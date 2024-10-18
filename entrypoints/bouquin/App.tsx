import React, { useState, useEffect } from "react";
import "./App.css";
import { browser } from "wxt/browser";
import { TBookmark } from "@/types/bookmark";
import { dfsBookmarks } from "@/lib/bookmark.ts";
import Navigation from "@/components/Navigation";
import BookmarkExplorer from "@/components/bookmark/BookmarkExplorer.tsx";
import Details from "@/components/Details.tsx";

const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<TBookmark | null>(null);

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      if (tree.length != 1) {
        console.log("Root bookmarks not available");
      } else {
        console.log(tree[0]);
        setBookmarks(dfsBookmarks(tree[0]));
      }
    });
  }, []);

  return (
    <main className="w-full h-full flex">
      <Navigation />
      <BookmarkExplorer bookmarks={bookmarks} />
      <Details />
    </main>
  );
};

export default App;
