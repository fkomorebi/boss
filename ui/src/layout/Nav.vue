<template>
  <div class="header-wrap">
    <div class="logo-center">
      <Logo />
    </div>
    <el-backtop />
  </div>
  <template v-if="device === 'mobile'">
    <el-affix :offset="0">
      <div class="menu-button-wrap">
        <el-button
          v-show="isVisableBackTop"
          text
          class="menu-button right"
          size="large"
          @click="onBackToTop"
        >
          Back to top
        </el-button>
      </div>
    </el-affix>
  </template>
</template>

<script setup>
import Logo from './components/Logo.vue'
import {computed, watchEffect, onMounted} from 'vue'
import {useWindowSize, useThrottleFn, useEventListener} from '@vueuse/core'
import useAppStore from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design
const {width} = useWindowSize()
const sidebar = computed(() => useAppStore().sidebar)
const device = computed(() => useAppStore().device)
watchEffect(() => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    useAppStore().closeSideBar()
  }
  if (width.value - 1 < WIDTH) {
    useAppStore().toggleDevice('mobile')
    useAppStore().closeSideBar()
  } else {
    useAppStore().toggleDevice('desktop')
  }
})

const isVisableBackTop = ref(false)
const el = shallowRef()
const container = shallowRef()
const handleScroll = () => {
  if (el.value) {
    // backtop默认值是200
    isVisableBackTop.value = el.value.scrollTop >= 200
  }
}
const onBackToTop = () => {
  el.value?.scrollTo({top: 0, behavior: 'smooth'})
}

const handleScrollThrottled = useThrottleFn(handleScroll, 300, true)
useEventListener(container, 'scroll', handleScrollThrottled)

onMounted(() => {
  container.value = document
  el.value = document.documentElement
})
</script>
<style lang="scss" scoped>
$header-height: 55px !default;
.header-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $header-height;
  background-color: #ECECEC;
  border-bottom: solid 1px #ECECEC;
}
.logo-center {
  line-height: var(--el-menu-item-height);
  text-align: center;
}
.menu {
  width: 400px;
  margin-right: 10%;
  float: right;
}
.menu-button-wrap {
  border-bottom: solid 1px var(--el-menu-border-color);
  background-color: white;
}
.right {
  float: right;
}
</style>
