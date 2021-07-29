<template>
  <div class="home">
    <div class="main-search">
      <input 
        class="main-search-input" 
        type="text" 
        :placeholder="search_placeholder"
        v-model="search_input"  
      >
      <button class="main-search-btn">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.66668 11C6.84999 10.9998 7.99921 10.6036 8.93134 9.87468L11.862 12.8053L12.8047 11.8627L9.87401 8.93201C10.6033 7.99979 10.9997 6.8503 11 5.66668C11 2.72601 8.60734 0.333344 5.66668 0.333344C2.72601 0.333344 0.333344 2.72601 0.333344 5.66668C0.333344 8.60734 2.72601 11 5.66668 11ZM5.66668 1.66668C7.87268 1.66668 9.66668 3.46068 9.66668 5.66668C9.66668 7.87268 7.87268 9.66668 5.66668 9.66668C3.46068 9.66668 1.66668 7.87268 1.66668 5.66668C1.66668 3.46068 3.46068 1.66668 5.66668 1.66668Z" fill="black" fill-opacity="0.45"/>
        </svg>
      </button>
    </div>
    <main-catalog v-if="show_catalogs" />
    <button class="btn-blue btn-analize">
      Анализировать
    </button>
    <h1 class="main-title">
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
import { main_table_data } from '@/fake'

export default {
  name: 'Home',
  data() {
    return {
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
      show_catalogs: false
    }
  },
  components: {
    MainTable,
    MainCatalog
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
    }
  },
  watch: {
    $route(to) {
        this.loadVars(to.params[1])
    }
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
  }

  .main-search-input {
    flex: 1;
    border: none;
  }

  .main-search-input::placeholder {
    color: rgba(0, 0, 0, 0.45);
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

  .main-title {
    margin-top: 64px;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: rgba(0, 0, 0, 0.9);
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

  .btn-outline > img {
    margin-right: 8px;
  }

  .btn-ratings {
    margin-top: 24px;
  }

  .btn-analize {
    margin-top: 48px;
  }
</style>
