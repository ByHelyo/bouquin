import { IS_FIREFOX } from "@/lib/environment.ts";
import { browser } from "wxt/browser";

export default defineBackground(() => {
  const action = IS_FIREFOX ? browser.browserAction : browser.action;

  action.onClicked.addListener(function () {
    browser.tabs.create({ url: browser.runtime.getURL("/bouquin.html") });
  });
});
