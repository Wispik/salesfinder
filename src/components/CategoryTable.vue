<template>
  <div class="cat-table">
      <vue-custom-scrollbar class="cat-table__body" :settings="scrollSettings">
        <table class="maintable">
          <tbody>
            <tr class="maintable__thead">
              <td class="maintable__thead-th">
                <div class="maintable__thead-th-cell">
                1
                </div>
              </td>
              <td class="maintable__thead-th">
                <div class="maintable__thead-th-cell">
                2
                </div>
              </td>
              <td class="maintable__thead-th">
                <div class="maintable__thead-th-cell">
                3
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </vue-custom-scrollbar>
      <div class="cat-table__bottom">
        <div class="cat-table__info">
          <span>
            Показано 1 - 20 (всего 111028 позиций)
          </span>
          <app-select :items="select_options" v-model="select_model" mini openUp width="54" />
        </div>
        <div class="cat-table__pagination">
          Страница
        </div>
      </div>
  </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue';

export default {
  props: ['settings', 'headers', 'data'],
  data() {
    return {
      scrollSettings: {
        suppressScrollX: true,
        suppressScrollY: false,
        wheelPropagation: false
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
      select_model: null
    }
  },
  components: {
    AppSelect
  }
}
</script>

<style lang="scss">
  .cat-table {
    width: 100%;
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
</style>