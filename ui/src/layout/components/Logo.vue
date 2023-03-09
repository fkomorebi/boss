<template>
  <transition name="logoFade">
    <router-link key="expand" to="/">
      <h1 class="title">{{ title }}</h1>
    </router-link>
  </transition>
</template>

<script setup>
import data from '@/settings'
const title = ref(data.title)
</script>

<style lang="scss" scoped>
.title {
  display: inline;
  color: black;
  font-weight: 300;
  line-height: 30px;
  font-size: large;
}
</style>
