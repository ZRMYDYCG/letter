// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.6_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@20.17.6_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.4.11_@types+node@20.17.6_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.4.11_@types+node@20.17.6_sass@1.81.0_terser@5.36.0_/node_modules/vite-plugin-mock/dist/index.mjs";
import AutoImport from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/unplugin-auto-import@0.18.5_@nuxt+kit@3.14.1592_rollup@4.27.2__@vueuse+core@12.0.0_typescript@5.4.5__rollup@4.27.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.1592_rollup@4.27.2__rollup_fe2nyy7fagy3liejzuk6cuz4e4/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/86151/Desktop/YQ-Wall-Message/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.14.1592_rollup@4.27.2__rollup_fe2nyy7fagy3liejzuk6cuz4e4/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/86151/Desktop/YQ-Wall-Message/packages/yq-wall-spa/vite.config.ts";
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "iconpark-icon"
          }
        }
      }),
      vueJsx(),
      viteMockServe({
        enable: command === "serve"
      }),
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
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1MVxcXFxEZXNrdG9wXFxcXFlRLVdhbGwtTWVzc2FnZVxcXFxwYWNrYWdlc1xcXFx5cS13YWxsLXNwYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTFcXFxcRGVza3RvcFxcXFxZUS1XYWxsLU1lc3NhZ2VcXFxccGFja2FnZXNcXFxceXEtd2FsbC1zcGFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTUxL0Rlc2t0b3AvWVEtV2FsbC1NZXNzYWdlL3BhY2thZ2VzL3lxLXdhbGwtc3BhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQge3ZpdGVNb2NrU2VydmV9IGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrXCJcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoe1xyXG4gICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiB0YWcgPT09ICdpY29ucGFyay1pY29uJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgICBlbmFibGU6IGNvbW1hbmQgPT09ICdzZXJ2ZSdcclxuICAgICAgfSksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVgsU0FBUyxlQUFlLFdBQVc7QUFFcFosU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFRLHFCQUFvQjtBQUM1QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVJ1TSxJQUFNLDJDQUEyQztBQVc1UixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUMzQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDRixVQUFVO0FBQUEsVUFDUixpQkFBaUI7QUFBQSxZQUNmLGlCQUFpQixDQUFDLFFBQVEsUUFBUTtBQUFBLFVBQ3BDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLFFBQ1osUUFBUSxZQUFZO0FBQUEsTUFDdEIsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
