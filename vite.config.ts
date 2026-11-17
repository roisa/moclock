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
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
}));
