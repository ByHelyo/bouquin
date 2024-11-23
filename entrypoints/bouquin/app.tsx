import "./app.css";
import BookmarkExplorer from "@/components/bookmark/bookmark-explorer.tsx";
import Details from "@/components/details.tsx";
import Navigation from "@/components/navigation.tsx";
import BookmarkProvider from "@/components/provider/bookmark-provider";
import BookmarkUpdateDialogProvider from "@/components/provider/bookmark-update-dialog-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const App: React.FC = () => {
  return (
    <main className="flex h-full w-full">
      <BookmarkProvider>
        <BookmarkUpdateDialogProvider>
          <Navigation />
          <BookmarkExplorer />
          <Details />
        </BookmarkUpdateDialogProvider>
      </BookmarkProvider>
      <Toaster />
    </main>
  );
};

export default App;
