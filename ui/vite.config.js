import {defineConfig} from 'vite'
import {resolve} from 'path'
import createPlugin from './vite/plugins'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: createPlugin(),
  base: './', // 开发公共基础路径
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8081, //启动端口
    host: true,
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://101.33.209.174:8080',
        changeOrigin: true,
        // ws: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
