<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import { mapMutations  } from 'vuex';
import { categories } from '@/fake'

export default {
  created() {
    let res = []
    categories.forEach(el => {
      let title1 = el.title
      res.push(title1)
      el.child.forEach(el2 => {
        let title2 = el2.title
        res.push(`${title1} / ${title2}`)
        el2.child.forEach(el3 => {
          res.push(`${title1} / ${title2} / ${el3.title}`)
        })
      })
    });
    this.SET_CATEGORIES_FOR_SEARCH(res)
  },
  methods: {
    ...mapMutations(['SET_CATEGORIES_FOR_SEARCH'])
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout"
    }
  }
}
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-flow: row nowrap;
  }

  .app-rightside {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
  }
</style>
