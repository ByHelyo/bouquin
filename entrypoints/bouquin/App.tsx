import React from "react";
import "./App.css";
import Navigation from "@/components/Navigation";
import BookmarkExplorer from "@/components/bookmark/BookmarkExplorer.tsx";
import Details from "@/components/Details.tsx";
import { BookmarkProvider } from "@/components/provider/BookmarkProvider.tsx";

const App: React.FC = () => {
  return (
    <main className="w-full h-full flex">
      <BookmarkProvider>
        <Navigation />
        <BookmarkExplorer />
        <Details />
      </BookmarkProvider>
    </main>
  );
};

export default App;
