import {createRouter, createWebHistory} from 'vue-router'
import data from '@/settings'
/**
 * 参数说明：
 * mate: {
 *  unable: Boolean 是否将该路由在菜单上禁用
 * }
 */
export const routes = [
  {
    path: '/',
    name: 'home',
    mate: {title: '主页'},
    component: () => import('@/views/home/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  },
})

router.beforeEach(async (to, from, next) => {
  document.title = data.title
  next()
})
