<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 5px;
}
</style>
