import Nav from "~/components/layout/Nav.tsx";
import { Bookmark, Home } from "lucide-react";

function Sidebar() {
  return (
    <div className="group/sidebar w-72 p-2 relative">
      <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
      <Nav
        links={[
          {
            title: "Home",
            variant: "default",
            icon: Home,
            to: window.location.pathname,
          },
          {
            title: "Bookmark",
            variant: "ghost",
            icon: Bookmark,
            to: window.location.pathname,
          },
        ]}
      />
    </div>
  );
}

export default Sidebar;
