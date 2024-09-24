<!-- src/App.vue -->
<template>
  <div>
    <router-view></router-view> <!-- Renders the matched component -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
@import 'scss/main.scss';
</style>
