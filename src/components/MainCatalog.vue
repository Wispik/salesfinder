<template>
  <div class="catalog">
      <div 
        class="catalog-item"
        v-for="cat in catalog_items"
        :key="cat.id"
        @click.stop="tooglePopup(cat.id)"
      >
        <img :src="require(`@/assets/images/icons/${cat.icon}.svg`)">
        {{ cat.title }}
        <div class="catalog-item-popup" v-if="cat.show_popup" v-click-outside="tooglePopup">

        </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            catalog_items: [
                {
                    id: 1,
                    icon: 'woman',
                    title: 'Женщинам',
                    show_popup: false
                },
                {
                    id: 2,
                    icon: 'byt',
                    title: 'Бытовая техника',
                    show_popup: false
                },
                {
                    id: 3,
                    icon: 'repair',
                    title: 'Для ремонта',
                    show_popup: false
                },
                {
                    id: 4,
                    icon: 'man',
                    title: 'Мужчинам',
                    show_popup: false
                },
                {
                    id: 5,
                    icon: 'sport',
                    title: 'Спорт',
                    show_popup: false
                },
                {
                    id: 6,
                    icon: 'home',
                    title: 'Дом',
                    show_popup: false
                },
                {
                    id: 7,
                    icon: 'child',
                    title: 'Детям',
                    show_popup: false
                },
                {
                    id: 8,
                    icon: 'beauty',
                    title: 'Красота',
                    show_popup: false
                },
                {
                    id: 9,
                    icon: 'auto',
                    title: 'Автотовары',
                    show_popup: false
                },
                {
                    id: 10,
                    icon: 'child-e',
                    title: 'Детская электроника',
                    show_popup: false
                },
                {
                    id: 11,
                    icon: 'toys',
                    title: 'Игрушки',
                    show_popup: false
                },
                {
                    id: 12,
                    icon: 'jewelry',
                    title: 'Ювелирные изделия',
                    show_popup: false
                },
                {
                    id: 13,
                    icon: 'boots',
                    title: 'Обувь',
                    show_popup: false
                },
                {
                    id: 14,
                    icon: 'food',
                    title: 'Продукты',
                    show_popup: false
                },
                {
                    id: 15,
                    icon: '18',
                    title: 'Товары для взрослых',
                    show_popup: false
                },
                {
                    id: 16,
                    icon: 'acs',
                    title: 'Аксессуары',
                    show_popup: false
                },
                {
                    id: 17,
                    icon: 'zoo',
                    title: 'Зоотовары',
                    show_popup: false
                },
                {
                    id: 18,
                    icon: 'pen',
                    title: 'Канцтовары',
                    show_popup: false
                },
                {
                    id: 19,
                    icon: 'el',
                    title: 'Электроника',
                    show_popup: false
                },
                {
                    id: 20,
                    icon: 'health',
                    title: 'Здоровье',
                    show_popup: false
                },
                {
                    id: 21,
                    icon: 'premium',
                    title: 'Premium',
                    show_popup: false
                }
            ],
        }
    },
    methods: {
        tooglePopup(id) {
            this.catalog_items.forEach(item => {
                if (item.id == id) {
                    item.show_popup = !item.show_popup
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .catalog {
        width: 744px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin-top: 64px;
    }

    .catalog-item {
        width: 195px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin: 12px 0;
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: rgba(0, 0, 0, 0.9);
        cursor: pointer;
        position: relative;
    }

    .catalog-item > img {
        margin-right: 12px;
    }

    .catalog-item-popup {
        position: absolute;
        width: 258px;
        height: 312px;
        left: 0;
        top: 48px;
    }
</style>