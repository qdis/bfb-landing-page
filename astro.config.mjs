// ABOUTME: Astro config for the Big Fat Board coming-soon Worker.
// ABOUTME: Cloudflare adapter plus a stable public site origin for SEO URLs.

import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bigfatboard.com",
  output: "server",
  session: false,
  adapter: cloudflare({
    imageService: "compile",
  }),
});
