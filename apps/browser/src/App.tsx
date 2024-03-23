import { ThemeProvider } from "~/provider/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayer from "~/components/layout/RootLayer.tsx";
import Home from "~/pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: window.location.pathname,
    element: <RootLayer />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
