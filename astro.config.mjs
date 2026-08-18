// ABOUTME: Astro config for the Big Fat Board coming-soon Worker.
// ABOUTME: Cloudflare adapter plus a stable public site origin for SEO URLs.

import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bfb.sh",
  output: "server",
  session: false,
  build: {
    inlineStylesheets: "always",
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
});
