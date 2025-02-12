import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Equivalent to "0.0.0.0" but allows easier Docker handling
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 8080, // Ensure this matches the exposed port in `docker-compose.yml`
      host: "localhost", // Use localhost if running Docker on Mac/Windows
    },
    watch: {
      usePolling: true,
      interval: 100, // Reduce interval for better responsiveness
    },
  },
});
