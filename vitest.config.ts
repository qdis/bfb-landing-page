// ABOUTME: Vitest config for unit tests that import the shipped TypeScript modules.
// ABOUTME: Node environment is enough; these tests do not boot a browser.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
  },
});
