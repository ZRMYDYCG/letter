import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "courent" | "default"
declare module "../../../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.9.0_db0@0.2.1_eslint@8.57.1_ioredis@5.4.2_pp7amizxngx4d3o5ki3rvnsjce/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}