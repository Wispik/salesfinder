<template>
  <div class="cat-table">
      <vue-custom-scrollbar class="table-block" :settings="scrollSettings">
      <!-- <div class="table-block"> -->
        <table class="cat-table__table">
          <tbody>
            <tr class="cat-table__thead">
              <td class="cat-table__thead-th" width="50">
                <div class="cat-table__thead-th-cell">
                  <checkbox v-model="select_all" />
                </div>
              </td>
              <td 
                class="cat-table__thead-th"
                v-for="head in tableHead"
                :key="head.id"
                v-show="head.show"
                :width="head.width"
              >
                <div class="cat-table__thead-th-cell">
                  {{ head.title }}
                </div>
              </td>
            </tr>
            <tr
              class="cat-table__tr"
              v-for="item in actualData"
              :key="item.id"
            >
              <td class="cat-table__td-w50"><checkbox v-model="item.checked" /></td>
              <td 
                
                v-for="h in tableHead"
                :key="h.id"
                v-show="h.show"
              >
                {{ item[h.name] }}              
              </td>
            </tr>
          </tbody>
        </table>
      <!-- </div> -->
      </vue-custom-scrollbar>
      <div class="cat-table__bottom">
        <div class="cat-table__info">
          <span>
            Показано {{ resFrom }} - {{ resTo }} (всего {{ allCount }} позиций)
          </span>
          <app-select 
            :items="select_options"
            v-model="select_model" 
            mini 
            openUp 
            width="54"
            @select="page=1"
          />
        </div>
        <div class="cat-table__pagination">
          Страница
          <img 
            class="cat-table__pagination-link pag-prev"
            :src="require(`@/assets/images/icons/pagination-arrow.svg`)"
            @click.stop="page -= 1"
            v-if="page > 1"
          >
          <div 
            class="cat-table__pagination-link"
            :class="{'cat-table__pagination-link-active': p == page}"
            v-for="(p, i) in calcPag"
            :key="i"
            @click.stop="p ? page=p : ''"
          >
            {{ p ? p: '...' }}
          </div>
          <img 
            class="cat-table__pagination-link"
            :src="require(`@/assets/images/icons/pagination-arrow.svg`)"
            @click.stop="page += 1"
            v-if="page < numLastPage"
          >
        </div>
      </div>
  <!-- </vue-custom-scrollbar> -->
  </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue';
import Checkbox from '@/components/Checkbox.vue';

export default {
  props: ['config'],
  data() {
    return {
      scrollSettings: {
        suppressScrollX: false,
        suppressScrollY: false,
        wheelPropagation: true
      },
      select_options: [
        {
          id: 1,
          title: 20
        },
        {
          id: 2,
          title: 50
        },
        {
          id: 3,
          title: 100
        }
      ],
      select_model: null,
      select_all: false,
      page: 1
    }
  },
  created() {
    this.select_model = this.select_options[0]
  },
  computed: {
    tableHead() {
      if (this.config.head) 
        return [...this.config.head].sort((a, b) => a.position - b.position);
      return []
    },
    resFrom() {
      return this.page > 1 ? (this.page-1)*this.select_model.title : 1
    },
    resTo() {
      let res = this.resFrom + this.select_model.title
      if (this.resFrom === 1) res -= 1
      if (this.config && this.config.data)
        return res <= this.config.data.length ? res : this.config.data.length
      return res
    },
    allCount() {
      return (this.config && this.config.data) ? this.config.data.length : 0
    },
    actualData() {
      if (this.config && this.config.data) {
        let n = (this.page-1) * this.select_model.title
        return this.config.data.slice(n, n + this.select_model.title)
      }
      return []
    },
    calcPag() {
      let res = []
      const range = (start, stop, step = 1) =>
           Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
      if (this.config && this.config.data) {
        if (this.numLastPage <= 5) 
          return range(1, this.numLastPage + 1)
        if (this.numLastPage - this.page <= 3) {
          res.push(1)
          res.push(null)
          return [...res, ...range(this.page - 1, this.numLastPage + 1)]
        }
        if (this.page <= 3) {
          res.push(1)
          res.push(2)
          res.push(3)
          res.push(4)
          res.push(null)
          res.push(this.numLastPage)
        } else {
          res.push(1)
          res.push(null)
          res.push(this.page - 1)
          res.push(this.page)
          res.push(this.page + 1)
          res.push(null)
          res.push(this.numLastPage)
        }
      }
      return res
    },
    numLastPage() {
      if (this.config && this.config.data) {
        return Math.ceil(this.config.data.length / this.select_model.title)
      }
      return 1
    }
  },
  components: {
    AppSelect,
    Checkbox
  },
  mounted() {
    if (!this.config.page) this.config.page = 1
  }
}
</script>

<style lang="scss">
  .cat-table {
    width: 100%;
    max-width: 1780px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .cat-table__body > .maintable {
    margin-top: 0;
  }

  .cat-table__bottom {
    margin-top: 40px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: rgba(0, 0, 0, 0.9);
  }

  .cat-table__info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .cat-table__info > span {
    margin-right: 10px;
  }

  .pag-prev {
    transform: rotate(180deg);
  }

  .cat-table__pagination {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
  }

  .cat-table__pagination-link {
    cursor: pointer;
  }

  .cat-table__pagination-link-active {
    color: #316D92;
  }

  .cat-table__table {
    width: 100%;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.2rem;
    border-spacing: 0px;
    border-collapse: collapse;
    // text-align: center;
    vertical-align: middle;
    color: rgba(0, 0, 0, 0.9);
    table-layout: fixed;
    overflow-x: scroll;
  }

  .cat-table__thead {
    height: 52px;
  }

  .cat-table__thead-th {
    font-weight: 500;
  }

  .cat-table__thead-th:first-child > .cat-table__thead-th-cell{
    border-radius: 4px 0 0 4px;
    justify-content: center;
  }

  .cat-table__thead-th:last-child > .cat-table__thead-th-cell{
    border-radius: 0 4px 4px 0;
    padding-right:10px;
  }

  .cat-table__thead-th-cell {
    height: 52px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #F7F7F7;
    padding: 5px 10px;
  }

  .cat-table__tr > td {
        border-bottom: 1px solid #F7F7F7;
        padding: 5px 10px;
    }

  .table-block {
    max-width: 1600px;
    position: relative;
    overflow-x: scroll;
  }

  .cat-table__td-w50 {
    padding-left: 15px;
    width: 50px;
  }
</style>