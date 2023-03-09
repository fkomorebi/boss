import vue from '@vitejs/plugin-vue'
import createAutoImport from './auto-import'
import createComponents from './componects'
import Icons from 'unplugin-icons/vite'
export default function createPlugins() {
  const vitePlugins = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  )

  return vitePlugins
}
