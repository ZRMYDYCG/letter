<script lang="ts">
import { defineComponent, h } from 'vue'
import SettingItem from './setting-item.vue'

export default defineComponent<any>({
  name: 'MenuItem',
  setup() {
    const items = [
      { type: 'display', icon: 'path/to/display-icon.svg' },
      { type: 'action', icon: 'path/to/action-icon.svg' }
    ]

    return () =>
      h(
        'div',
        {
          class: 'relative pt-[52px] text-[16px]'
        },
        [
          h(
            'div',
            {
              class: [
                'fixed top-[50%] left-[20px] z-[9999] w-[65px] h-[460px] border-[1px] border-[#E5E5E5] transform -translate-y-1/2 rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'
              ]
            },
            items.map((item) =>
              h(SettingItem, {
                type: item.type,
                icon: item.icon
              })
            )
          )
        ]
      )
  }
})
</script>

<style scoped></style>
