import { defineConfig, UserManifest } from "wxt";
import * as path from "path";
import fs from "fs";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: () => {
    const version = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "package.json")).toString(),
    ).version;

    const conf: UserManifest = {
      name: "Bouquin",
      author: "ByHelyo",
      version: version,
      action: {},
      permissions: ["bookmarks"],
      web_accessible_resources: [
        {
          resources: ["bouquin.html"],
          matches: ["*://*/*"],
        },
      ],
    };

    return conf;
  },
});
