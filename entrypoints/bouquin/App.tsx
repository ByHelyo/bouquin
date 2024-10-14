import React, { useState, useEffect } from "react";
import "./App.css";
import { browser } from "wxt/browser";
import { TBookmark } from "@/types/bookmark";

const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<TBookmark[]>([]);

  useEffect(() => {
    browser.bookmarks.getTree().then((tree) => {
      console.log(tree);
    });
  }, []);

  return <main className="w-full h-full">Hello world!</main>;
};

export default App;
