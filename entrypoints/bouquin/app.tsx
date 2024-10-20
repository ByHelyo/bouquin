import "./app.css";
import BookmarkExplorer from "@/components/bookmark/bookmark-explorer.tsx";
import Details from "@/components/details.tsx";
import Navigation from "@/components/navigation.tsx";
import { BookmarkProvider } from "@/components/provider/bookmark-provider.tsx";
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
