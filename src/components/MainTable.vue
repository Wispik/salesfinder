<template>
  <table class="maintable">
      <thead class="maintable__thead">
          <th
            class="maintable__thead-th"
            v-for="(head, i) in table_head"
            :key="i"
          >
            {{ head }}
          </th>
      </thead>
      <tbody>
          <tr
            class="maintable__tr"
            v-for="i in tableData"
            :key="i.id"
          >
            <td class="maintable__td-w50">{{ i.id }}</td>
            <td>
                <div class="maintable__td-info">
                    <img :src="require(`@/assets/images/fake/${i.image}`)">
                    <span>{{ i.product }}</span>
                </div>
            </td>
            <td>{{ i.price }}</td>
            <td>{{ i.category }}</td>
            <td>{{ i.pos }}</td>
            <td>{{ i.rewiews }}</td>
            <td>{{ i.rating }}</td>
            <td>{{ i.seller }}</td>
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
                'Товар',
                'Цена, р.',
                'Категория',
                'Позиция',
                'Отзывы',
                'Рейтинг',
                'Продавец' 
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
    }

    .maintable__thead {
        height: 52px;
        background: #F7F7F7;
    }

    .maintable__thead-th {
        font-weight: 500;
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
    }

    .maintable__td-info > img {
        margin-right: 8px;
    }

    .maintable__td-w50 {
        width: 50px;
    }
</style>