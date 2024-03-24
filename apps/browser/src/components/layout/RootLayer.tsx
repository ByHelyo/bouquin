import { Outlet } from "react-router-dom";
import Sidebar from "~/components/layout/Sidebar.tsx";
function RootLayer() {
  return (
    <div className="min-h-full flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default RootLayer;
