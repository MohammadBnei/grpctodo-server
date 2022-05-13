import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteCommonjs(), svelte()],
  server: {
    host: "localhost",
    port: 3000,
    https: {
      key: fs.readFileSync("./certs/grpctodo.dev-key.pem"),
      cert: fs.readFileSync("./certs/grpctodo.dev.pem"),
    },
  },
});
