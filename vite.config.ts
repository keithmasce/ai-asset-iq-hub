import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // We are passing this directly to the underlying Vite config
  vite: {
    // This forces the Nitro server engine to build for Vercel
    nitro: {
      preset: "vercel",
    },
  },
});
