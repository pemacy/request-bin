import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test", override: true });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./src/tests/testSetup.ts",
  },
});
