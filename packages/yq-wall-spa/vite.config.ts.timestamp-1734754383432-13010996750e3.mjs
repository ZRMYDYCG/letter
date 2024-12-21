// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.6_sass-embedded@1.82.0_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@20.17.6_sass-embedded@1.82.0_sass@1.81.0_ter_dtgjqyk46goyjghsw7xvloysiq/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.4.11_@types+node@20.17.6_sass-embedded@1.82.0_sass@1.81.0_z47rlnwhi34vit22ajwlgicgre/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/unplugin-auto-import@0.18.5_@nuxt+kit@3.14.1592_rollup@4.27.2__@vueuse+core@12.0.0_typescript@5.4.5__rollup@4.27.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.1592_rollup@4.27.2__rollup_fe2nyy7fagy3liejzuk6cuz4e4/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.1592_rollup@4.27.2__rollup_fe2nyy7fagy3liejzuk6cuz4e4/node_modules/unplugin-vue-components/dist/resolvers.js";

// src/IPV4/ipv4.ts
var HOSTIP = "192.168.220.1";

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/Users/86151/Desktop/%E9%A1%B9%E7%9B%AE/letter/packages/yq-wall-spa/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "iconpark-icon"
        }
      }
    }),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    open: true,
    // 启动时自动打开浏览器
    hmr: true,
    // 热更新
    // host: '192.168.93.45', // 支持真机调试
    host: HOSTIP,
    // 支持真机调试
    port: 5173,
    // 端口号
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL0lQVjQvaXB2NC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDg2MTUxXFxcXERlc2t0b3BcXFxcXHU5ODc5XHU3NkVFXFxcXGxldHRlclxcXFxwYWNrYWdlc1xcXFx5cS13YWxsLXNwYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTFcXFxcRGVza3RvcFxcXFxcdTk4NzlcdTc2RUVcXFxcbGV0dGVyXFxcXHBhY2thZ2VzXFxcXHlxLXdhbGwtc3BhXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE1MS9EZXNrdG9wLyVFOSVBMSVCOSVFNyU5QiVBRS9sZXR0ZXIvcGFja2FnZXMveXEtd2FsbC1zcGEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCB7IEhPU1RJUCB9IGZyb20gJy4vc3JjL0lQVjQvaXB2NC50cydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnID09PSAnaWNvbnBhcmstaWNvbidcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIG9wZW46IHRydWUsIC8vIFx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxyXG4gICAgaG1yOiB0cnVlLCAvLyBcdTcwRURcdTY2RjRcdTY1QjBcclxuICAgIC8vIGhvc3Q6ICcxOTIuMTY4LjkzLjQ1JywgLy8gXHU2NTJGXHU2MzAxXHU3NzFGXHU2NzNBXHU4QzAzXHU4QkQ1XHJcbiAgICBob3N0OiBIT1NUSVAsIC8vIFx1NjUyRlx1NjMwMVx1NzcxRlx1NjczQVx1OEMwM1x1OEJENVxyXG4gICAgcG9ydDogNTE3MywgLy8gXHU3QUVGXHU1M0UzXHU1M0Y3XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjUxNzQnLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTFcXFxcRGVza3RvcFxcXFxcdTk4NzlcdTc2RUVcXFxcbGV0dGVyXFxcXHBhY2thZ2VzXFxcXHlxLXdhbGwtc3BhXFxcXHNyY1xcXFxJUFY0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1MVxcXFxEZXNrdG9wXFxcXFx1OTg3OVx1NzZFRVxcXFxsZXR0ZXJcXFxccGFja2FnZXNcXFxceXEtd2FsbC1zcGFcXFxcc3JjXFxcXElQVjRcXFxcaXB2NC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvODYxNTEvRGVza3RvcC8lRTklQTElQjklRTclOUIlQUUvbGV0dGVyL3BhY2thZ2VzL3lxLXdhbGwtc3BhL3NyYy9JUFY0L2lwdjQudHNcIjtleHBvcnQgY29uc3QgSE9TVElQOiBzdHJpbmcgPSAnMTkyLjE2OC4yMjAuMSdcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpWCxTQUFTLGVBQWUsV0FBVztBQUVwWixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCOzs7QUNQcVcsSUFBTSxTQUFpQjs7O0FEQS9MLElBQU0sMkNBQTJDO0FBV2xSLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsaUJBQWlCLENBQUMsUUFBUSxRQUFRO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sS0FBSztBQUFBO0FBQUE7QUFBQSxJQUVMLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
