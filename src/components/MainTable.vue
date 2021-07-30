<template>
  <table class="maintable">
      <tbody>
          <tr class="maintable__thead">
              <td
                class="maintable__thead-th"
                v-for="(head, i) in table_head"
                :key="i"
                >
                <div class="maintable__thead-th-cell" :class="{'maintable__thead-th-cell-align-right': i > 1}">
                    {{ head }}
                </div>
             </td>
          </tr>
          <tr
            class="maintable__tr"
            v-for="i in tableData"
            :key="i.id"
          >
            <td class="maintable__td-w50">{{ i.id }}</td>
            <td>
                <router-link class="maintable__td-info" to="/" tag="div" active-class="">
                    <img :src="require(`@/assets/images/fake/${i.image}`)">
                    <span>{{ i.product }}</span>
                </router-link>
            </td>
            <td align="right" style="padding-right:10px;">{{ i.price }}</td>
            <td align="right" style="padding-right:10px;">{{ i.category }}</td>
            <td align="right" style="padding-right:10px;">{{ i.pos }}</td>
            <td align="right" style="padding-right:10px;">{{ i.rewiews }}</td>
            <td align="right" style="padding-right:10px;">{{ i.rating }}</td>
            <td align="right" style="padding-right:10px;">{{ i.seller }}</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
    props: ['tableData'],
    data() {
        return {
            table_head: [
                '№',
                'Категория',
                'Выручка (руб)',
                'Продаж (шт.)',
                'Сред. выручка на товар (руб.)',
                'Товаров',
                'Брендов',
                'Продавцов' 
            ]
        }
    }
}
</script>

<style lang="scss">
    .maintable {
        width: 100%;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        border-spacing: 0px;
        border-collapse: collapse;
        text-align: center;
        vertical-align: middle;
        margin-top: 32px;
        color: rgba(0, 0, 0, 0.9);;
    }

    .maintable__thead {
        height: 52px;
    }

    .maintable__thead-th {
        font-weight: 500;
    }

    .maintable__thead-th:first-child > .maintable__thead-th-cell{
        border-radius: 4px 0 0 4px;
        justify-content: center;
    }

    .maintable__thead-th:last-child > .maintable__thead-th-cell{
        border-radius: 0 4px 4px 0;
        padding-right:10px;
    }

    .maintable__thead-th-cell {
        height: 52px;
        width: 100%;
        display: flex;
        align-items: center;
        background: #F7F7F7;
    }

    .maintable__thead-th-cell-align-right {
        justify-content: flex-end;
    }

    .maintable__tr {
        height: 52px;
    }

    .maintable__tr > td {
        border-bottom: 1px solid #F7F7F7;
    }

    .maintable__td-info {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #316D92;
        cursor: pointer;
    }

    .maintable__td-info > img {
        margin-right: 8px;
    }

    .maintable__td-w50 {
        width: 50px;
    }
</style>