<script lang="ts">
import { h, defineComponent } from 'vue';

export default defineComponent<any>({
  name: 'MenuItem',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['display', 'action'].includes(value),
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: [
            'menu-item',
            props.type === 'action' ? 'hover:bg-gray-200' : '',
          ],
        },
        [
          h('img', { src: props.icon, alt: 'icon', class: 'icon-class' }),
        ]
      );
  },
});
</script>