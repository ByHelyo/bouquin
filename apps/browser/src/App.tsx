import { ThemeProvider } from "~/provider/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <div className="bg-red-500">Hello world!</div>
    </ThemeProvider>
  );
}

export default App;
