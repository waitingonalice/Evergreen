import { defineConfig } from "vitest/config";
import { mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ["**/*.{test,spec}.{ts,tsx}"],
      environment: "jsdom",
      coverage: {
        reporter: ["html", "text"],
      },
      clearMocks: true,
      passWithNoTests: true,
      update: true,
      root: "./src",
    },
  })
);
