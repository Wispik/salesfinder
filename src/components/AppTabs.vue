<template>
  <div class="tabs__block">
    <ul class="tabs">
      <li 
        v-for="i in tabs"
        :key="i.id"
        class="tab"
        :class="{'tab-active': idActiveTab==i.id}"
        @click="clickTab(i)"
      >
        {{ i.title }}
      </li>
    </ul>
    <div class="right-block">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: ['tabs', 'modelValue'],
  computed: {
    idActiveTab() {
      if (this.modelValue instanceof Object) {
        return this.modelValue.id
      }
      this.clickTab(this.tabs[0])
      return this.tabs[0].id
    }
  },
  methods: {
    clickTab(tab) {
      this.$emit('change', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabs__block {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .tabs {
    display: flex;
    flex-flow: row nowrap;
    list-style-type: none;
  }

  .tab {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    font-size: 1.8rem;
    line-height: 2.2rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
    position: relative;
    padding-bottom: 7px;
    transition: .4s;
  }

  .tab + .tab {
    margin-left: 32px;
  }

  .tab.tab-active {
    color: #316D92;
  }

  .tab:hover {
    color: #316D92;
  }

  .tab.tab-active::before {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #316D92;
    box-shadow: 0px 1px 2px rgba(34, 54, 97, 0.16);
    transition: .4s;
  }

  .right-block {
    display: flex;
    flex-flow: row nowrap;
    gap: 16px
  }
</style>