import "./app.css";
import BookmarkExplorer from "@/components/bookmark/bookmark-explorer.tsx";
import Details from "@/components/details.tsx";
import Navigation from "@/components/navigation.tsx";
import { BookmarkDialogProvider } from "@/components/provider/bookmark-dialog-provider";
import { ChromeBookmarkProvider } from "@/components/provider/chrome-bookmark-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const App: React.FC = () => {
  return (
    <main className="flex h-full w-full">
      <ChromeBookmarkProvider>
        <BookmarkDialogProvider>
          <Navigation />
          <BookmarkExplorer />
          <Details />
        </BookmarkDialogProvider>
      </ChromeBookmarkProvider>
      <Toaster />
    </main>
  );
};

export default App;
