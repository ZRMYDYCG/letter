import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    unocss: true,
  }),
  {
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'unused-imports/no-unused-vars': 'off',
      'antfu/if-newline': 'off',
      'jsdoc/require-returns-description': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-dupe-disjunctions': 'off',
    },
    ignores: ['**/*.d.ts'],
  },
)
