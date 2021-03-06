<template>
  <div class="home">
    <div class="main-search" :class="{'main-search-active': search_input_focused}">
      <input 
        class="main-search-input" 
        type="text" 
        :placeholder="search_placeholder"
        v-model="search_input"
        @focus="focus_search_input"
        @blur="unfocus_search_input"
        @input="change_search_input"
        @keydown.up="select_prev_search_item"
        @keydown.down="select_next_search_item"
        @keyup.enter='select_search_item'
      >
      <button class="main-search-btn">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.66668 11C6.84999 10.9998 7.99921 10.6036 8.93134 9.87468L11.862 12.8053L12.8047 11.8627L9.87401 8.93201C10.6033 7.99979 10.9997 6.8503 11 5.66668C11 2.72601 8.60734 0.333344 5.66668 0.333344C2.72601 0.333344 0.333344 2.72601 0.333344 5.66668C0.333344 8.60734 2.72601 11 5.66668 11ZM5.66668 1.66668C7.87268 1.66668 9.66668 3.46068 9.66668 5.66668C9.66668 7.87268 7.87268 9.66668 5.66668 9.66668C3.46068 9.66668 1.66668 7.87268 1.66668 5.66668C1.66668 3.46068 3.46068 1.66668 5.66668 1.66668Z" fill="black" fill-opacity="0.45"/>
        </svg>
      </button>
      <slide-y-up-transition>
        <div class="main-search-result" v-if="show_search_results & search_results.length > 0">
          <div 
            class="main-search-resilt-item"
            :class="{'main-search-resilt-item-selected': i == search_input_manual_selected}"
            v-for="(res, i) in search_results"
            :key="i"
            v-html="formatSearchResult(res)">
          >
          </div>
        </div>
      </slide-y-up-transition>
    </div>
    <main-catalog v-if="show_catalogs" />
    <router-link class="btn-blue btn-analize" :to="{name: 'CategoryInfov2'}" tag="button">
      Анализировать
    </router-link>
    <h1 class="main-title mt64">
      {{ title_text }}
    </h1>
    <button class="btn-outline btn-ratings" v-if="show_btn_ratings">
      <img :src="require(`@/assets/images/icons/rating.svg`)">
      Все рейтинги
    </button>
    <main-table 
      :tableData=table_data
    />
  </div>
</template>

<script>
import MainTable from '@/components/MainTable.vue'
import MainCatalog from '@/components/MainCatalog.vue'
import { SlideYUpTransition } from 'vue2-transitions'
import { main_table_data } from '@/fake'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      NUM_SEARCH_RESULTS: 10,
      table_data: main_table_data,
      search_placeholder: '',
      search_placeholders_list: [
        {
          type: 'products',
          text: 'Поиск по товарам'
        },
        {
          type: 'category',
          text: 'Поиск по категориям'
        },
        {
          type: 'sellers',
          text: 'Поиск по продавцам'
        },
        {
          type: 'brands',
          text: 'Поиск по брендам'
        }
      ],
      search_input: '',
      search_input_focused: false,
      title_text: '',
      title_list: [
        {
          type: 'products',
          text: 'Топ-20 товаров по выручке за последние 7 дней'
        },
        {
          type: 'category',
          text: 'Топ-20 категорий по выручке за последние 7 дней'
        },
        {
          type: 'sellers',
          text: 'Топ-20 продавцов по выручке за последние 7 дней'
        },
        {
          type: 'brands',
          text: 'Топ-20 брендов по выручке за последние 7 дней'
        }
      ],
      show_btn_ratings: false,
      show_catalogs: false,
      show_search_results: false,
      search_results: [],
      search_input_manual_selected: -1
    }
  },
  components: {
    MainTable,
    MainCatalog,
    SlideYUpTransition
  },
  mounted() {
    this.loadVars(this.$route.params[1])
  },
  methods: {
    loadVars(type) {
      this.search_placeholder = this.search_placeholders_list.find(item => item.type == type).text
      this.title_text = this.title_list.find(item => item.type == type).text

      if (type == 'category') {
        this.show_btn_ratings = false
        this.show_catalogs = true
      }
      else {
        this.show_btn_ratings = true
        this.show_catalogs = false
      }
    },
    focus_search_input() {
      this.search_input_focused=true
      if (this.search_input.length > 0) this.show_search_results=true
    },
    unfocus_search_input() {
      this.search_input_focused=false
      this.show_search_results=false
      this.search_input_manual_selected = -1
    },
    change_search_input() {
      this.search_input_manual_selected = -1
      if (this.search_input.length == 0) {
        this.show_search_results=false
        this.search_results = []
      }
      if (this.search_input.length > 0 & !this.show_search_results) {
        this.show_search_results = true
      }
      if (this.search_input.length > 0) {
        this.search(this.search_input)
      }
    },
    search(s) {
      let res = []
      for (let i = 0; i < this.CATEGORIES_FOR_SEARCH.length; i++) {
        const el = this.CATEGORIES_FOR_SEARCH[i];
        if (el.toLowerCase().includes(s.toLowerCase())) {
          res.push(el)
          if (res.length == this.NUM_SEARCH_RESULTS) break
        }
      }
      this.search_results = res
    },
    formatSearchResult(current) {
      let reggie = new RegExp(this.search_input, "ig");
      let pos = current.search(reggie)
      if (pos == -1) {
        return current
      } else {
        const len_search = this.search_input.length
        let res = `${current.substring(0, pos)}<span class="blue-text">${current.substring(pos, pos+len_search)}</span>${current.substring(pos+len_search)}`
        return res
      }
    },
    select_prev_search_item() {
      if (this.search_results.length > 0) {
        this.search_input_manual_selected -= 1
        if (this.search_input_manual_selected < 0) 
          this.search_input_manual_selected = this.search_results.length - 1
      }
    },
    select_next_search_item() {
      if (this.search_results.length > 0) {
        this.search_input_manual_selected += 1
        if (this.search_input_manual_selected == this.search_results.length) 
          this.search_input_manual_selected = 0
      }
    },
    select_search_item() {
      this.unfocus_search_input()
    }
  },
  watch: {
    $route(to) {
        this.loadVars(to.params[1])
    }
  },
  computed: {
    ...mapGetters(['CATEGORIES_FOR_SEARCH'])
  }

}
</script>

<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 68px 24px 20px 24px;
  }

  .main-search {
    width: 550px;
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 32px;
    transition: 0.4s;
    position: relative;
  }

  .main-search-active {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.24);
  }

  .main-search-input {
    flex: 1;
    border: none;
  }

  .main-search-input::placeholder {
    color: rgba(0, 0, 0, 0.45);
  }

  .main-search-result {
    position: absolute;
    width: 100%;
    z-index: 100;
    background: #FFFFFF;
    padding: 4px 0;
    left: 0;
    top: 44px;
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .main-search-resilt-item {
    width: 100%;
    height: 32px;
    padding: 5px 16px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.2rem;
    cursor: pointer;
    transition: 0.4s;
  }

  .main-search-resilt-item:hover {
    background: darken(#ffffff, 5%);
  }

  .main-search-resilt-item-selected {
    background: darken(#ffffff, 5%);
  }

  .btn-blue {
    width: 174px;
    height: 36px;
    background: #3D77A7;
    border: 1px solid rgba(53, 64, 82, 0.15);
    box-shadow: 0px 1px 3px rgba(24, 45, 63, 0.32);
    border-radius: 4px;
    color: #FFFFFF;
  }

  .btn-blue:hover {
    background: darken(#3D77A7, 7%);
  }

  .main-title {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: rgba(0, 0, 0, 0.9);
  }

  .main-title.mt64 {
    margin-top: 64px;
  }

  .second-title {
    font-family: Ubuntu;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: rgba(0, 0, 0, 0.65);
  }

  .second-title.mt8 {
    margin-top: 8px;
  }

  .btn-outline {
    width: 123px;
    height: 32px;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .btn-outline.btn-width-auto {
    width: auto;
    padding: 5px 9px;
  }

  .btn-outline:hover {
    background: darken(#FFFFFF, 7%);
  }

  .btn-outline > img {
    margin-right: 8px;
  }

  .btn-ratings {
    margin-top: 24px;
  }

  .btn-analize {
    margin-top: 48px;
  }

  .blue-text {
    color: #316D92;
  }

  .ps__rail-x {
    height: 10px !important;
  }

  .ps__rail-x.ps--clicking .ps__thumb-x, .ps__rail-x:focus>.ps__thumb-x, .ps__rail-x:hover>.ps__thumb-x {
    height: 6px !important;
  }

  .ps__rail-y {
    width: 10px !important;
  }

.ps__rail-y.ps--clicking .ps__thumb-y, .ps__rail-y:focus>.ps__thumb-y, .ps__rail-y:hover>.ps__thumb-y  {
    width: 6px !important;
  }
</style>
