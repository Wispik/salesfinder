<template>
  <div id="app" class="app">
    <app-sidebar />
    <div class="app-rightside">
      <app-header />
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppSidebar,
    AppHeader
  }
}
</script>

<style lang="scss">
  .app {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row nowrap;
  }

  .app-rightside {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
