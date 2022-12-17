/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 22:59:43
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-08 19:49:35
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/mixins.scss";`,
      },
    },
  },
});
