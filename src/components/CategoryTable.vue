<template>
  <div class="cat-table">
      <vue-custom-scrollbar class="table-block" :settings="scrollSettings">
        <table class="cat-table__table">
          <tbody>
            <tr class="cat-table__thead">
              <td class="cat-table__thead-th" width="50">
                <div class="cat-table__thead-th-cell">
                  <checkbox v-model="select_all" rounded/>
                </div>
              </td>
              <td 
                class="cat-table__thead-th"
                v-for="head in tableHead"
                :key="head.id"
                v-show="head.show"
                :width="head.width"
                @click.stop="setSortBy(head.name)"
              >
                <div 
                  class="cat-table__thead-th-cell"
                  :class="{'cat-table__thead-th-cell-sorted': head.name == sortedBy,'align-right': isNum(actualData[0][head.name])}"  
                >
                  {{ head.title }}
                  <img 
                    :src="require(`@/assets/images/icons/table_sort_arrow.svg`)"
                    v-if="head.name == sortedBy"
                    class="cat-table__sorted-arrow"
                    :class="{'sorted-desc': !sortedAsc}"
                  >
                </div>
              </td>
            </tr>
            <tr
              class="cat-table__tr"
              v-for="item in actualData"
              :key="item.id"
            >
              <td class="cat-table__td-w50"><checkbox v-model="item.checked" rounded/></td>
              <td 
                
                v-for="h in tableHead"
                :key="h.id"
                v-show="h.show"
              >
                <div 
                  class="cat-table__td-cell"
                  :class="{'align-right': isNum(item[h.name]),'cat-table__td-text-overflow': h.name=='topic','cat-table__td-link': h.name=='topic' || h.name=='brand' || h.name=='seller'
                    }
                  "
                >
                  <div 
                    class="cat-table__td-title-image"
                    v-if="h.name=='title' && item.image"
                  >
                   <img :src="item.image">
                  </div>
                  <div 
                    class="cat-table__td-title-text"
                    v-if="h.name=='title' && item.image"
                  >
                    {{ item[h.name] }} 
                  </div>
                  <template v-else>
                    {{ item[h.name] }}
                  </template>              
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      page: 1,
      sortedBy: null,
      sortedAsc: true
    }
  },
  created() {
    this.select_model = this.select_options[0]
  },
  methods: {
    setSortBy(col) {
      if (this.sortedBy == col) this.sortedAsc = !this.sortedAsc
      else this.sortedAsc = true
      this.sortedBy = col
      this.page = 1
    },
    isNum(i) {
      return typeof i === 'number' || i.slice(-1) === '₽'
    }
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
        let res = [...this.config.data]
        if (this.sortedBy) {
          if (this.sortedAsc)
            res.sort((a, b) => a[this.sortedBy].toString().localeCompare(b[this.sortedBy].toString()))
          else
            res.sort((a, b) => b[this.sortedBy].toString().localeCompare(a[this.sortedBy].toString()))
        }
        let n = (this.page-1) * this.select_model.title
        return res.slice(n, n + this.select_model.title)
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
  },
  watch: {
    select_all(newVal) {
      this.actualData.forEach(el => {
        el.checked = newVal
      })
    }
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
    cursor: pointer;
    transition: 0.4s;
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
    transition: 0.4s;
  }

  .cat-table__thead-th-cell:hover {
    background: darken(#F7F7F7, 10%);
  }

  .cat-table__thead-th-cell-sorted {
    background: darken(#F7F7F7, 10%);
  }

  .cat-table__tr > td {
        border-bottom: 1px solid #F7F7F7;
        padding: 5px 10px;
        height: 42px;
    }

  .table-block {
    position: relative;
    overflow-x: scroll;
  }

  .cat-table__td-w50 {
    padding-left: 13px !important;
    width: 50px;
  }

  .cat-table__sorted-arrow {
    transition: 0.4s;
    margin-left: 6px;
  }

  .cat-table__sorted-arrow.sorted-desc {
    transform: rotate(180deg);
  }

  .cat-table__td-cell {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .cat-table__td-cell.align-right {
    justify-content: flex-end;
  }

  .cat-table__thead-th-cell.align-right {
    justify-content: flex-end;
  }

  .cat-table__td-title-image {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin-right: 8px;

    & > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  .cat-table__td-title-text {
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cat-table__td-text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .cat-table__td-link {
    cursor: pointer;
    color: #316D92;
  }
</style>