import "./App.css";
import Details from "@/components/Details.tsx";
import Navigation from "@/components/Navigation";
import BookmarkExplorer from "@/components/bookmark/BookmarkExplorer.tsx";
import { BookmarkProvider } from "@/components/provider/BookmarkProvider.tsx";
import React from "react";

const App: React.FC = () => {
  return (
    <main className="flex h-full w-full">
      <BookmarkProvider>
        <Navigation />
        <BookmarkExplorer />
        <Details />
      </BookmarkProvider>
    </main>
  );
};

export default App;
