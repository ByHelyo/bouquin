import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: new URL("./src/popup/index.html", import.meta.url).pathname,
        background: new URL("./src/background/index.html", import.meta.url)
          .pathname,
      },
    },
  },
});
