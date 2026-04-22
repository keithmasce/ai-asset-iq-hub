import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // This passes additional configuration into the underlying Vite/Nitro setup
  vite: {
    nitro: {
      preset: "vercel",
    },
  },
});
