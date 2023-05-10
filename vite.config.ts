import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginImp from "vite-plugin-imp";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name: string) => {
            if (name === "col" || name === "row") {
              return "antd/lib/style/index.js";
            }
            return `antd/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    sourcemap: false,
    outDir: "build",
  },
});
