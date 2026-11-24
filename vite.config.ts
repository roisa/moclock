import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps every URL relative, so the same build runs at a domain root,
// in a sub-folder (play.babymo.id/time-adventure/) and inside Capacitor.
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react()],
  define: {
    __HUB__: JSON.stringify(mode === "hub"),
    __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16)),
  },
  build: {
    target: "es2019",
    assetsInlineLimit: 0,
    sourcemap: false,
    chunkSizeWarningLimit: 2500, // Babylon.js (Time Racers only) is one big chunk
    rollupOptions: {
      // the site: Time Rush is the home page, Time Adventure lives in /learn/, Time Racers in /racers/.
      // The play.babymo.id export ships Time Adventure only (export-hub.mjs flattens learn/ into its folder).
      input: (mode === "hub" ? { learn: "learn/index.html" } : {
        main: "index.html", // Baby Mo: Time Rush (2.5D delivery adventure)
        learn: "learn/index.html", // Baby Mo: Time Adventure
        racers: "racers/index.html", // Baby Mo: Time Racers (3D)
      }) as Record<string, string>,
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
}));
