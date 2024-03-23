import Nav from "~/components/layout/Nav.tsx";
import { Bookmark, Home } from "lucide-react";

function RootLayer() {
  return (
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
  );
}

export default RootLayer;
