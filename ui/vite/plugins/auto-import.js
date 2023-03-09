import autoImport from 'unplugin-auto-import/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: false, // js项目用不上ts的提示
    resolvers: [ElementPlusResolver(), IconsResolver()],
    // eslint报错解决
    eslintrc: {
      enabled: true, // Default `false`
      filepath: '.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
  })
}
