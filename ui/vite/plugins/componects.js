import components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function createComponents() {
  return components({
    dts: false, // js项目不需要提示
    resolvers: [IconsResolver(), ElementPlusResolver()],
  })
}
