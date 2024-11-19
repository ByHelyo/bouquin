import "./app.css";
import BookmarkExplorer from "@/components/bookmark/bookmark-explorer.tsx";
import Details from "@/components/details.tsx";
import Navigation from "@/components/navigation.tsx";
import { ChromeBookmarkProvider } from "@/components/provider/chrome-bookmark-provider.tsx";
import React from "react";

const App: React.FC = () => {
  return (
    <main className="flex h-full w-full">
      <ChromeBookmarkProvider>
        <Navigation />
        <BookmarkExplorer />
        <Details />
      </ChromeBookmarkProvider>
    </main>
  );
};

export default App;
