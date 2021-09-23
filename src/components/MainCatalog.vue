<template>
  <div class="catalog">
      <div 
        class="catalog-item"
        v-for="cat in catalog_items"
        :key="cat.c_id"
        @click.stop="openPopup(cat.c_id)"
      >
        <div class="catalog-item-button">
            <img :src="require(`@/assets/images/icons/${cat.c_id}.svg`)">
            {{ cat.c_name }}
        </div>
        <fade-transition>
            <div class="catalog-item-popup" v-if="cat.show_popup" v-click-outside="closePopups">
                <tree-view :items="getCategory(cat.c_id)" />
            </div>
        </fade-transition>
      </div>
  </div>
</template>

<script>
import TreeView from '@/components/TreeView.vue'
import {FadeTransition} from 'vue2-transitions'
import {categories} from '@/fake'
// import api from '@/api'

export default {
    data() {
        return {
            catalog_items: [
                {
                    c_id: 1,
                    icon: 'woman',
                    c_name: 'Женщинам',
                    show_popup: false
                },
                {
                    c_id: 2,
                    icon: 'byt',
                    c_name: 'Бытовая техника',
                    show_popup: false
                },
                {
                    c_id: 3,
                    icon: 'repair',
                    c_name: 'Для ремонта',
                    show_popup: false
                },
                {
                    c_id: 4,
                    icon: 'man',
                    c_name: 'Мужчинам',
                    show_popup: false
                },
                {
                    c_id: 5,
                    icon: 'sport',
                    c_name: 'Спорт',
                    show_popup: false
                },
                {
                    c_id: 6,
                    icon: 'home',
                    c_name: 'Дом',
                    show_popup: false
                },
                {
                    c_id: 7,
                    icon: 'child',
                    c_name: 'Детям',
                    show_popup: false
                },
                {
                    c_id: 8,
                    icon: 'beauty',
                    c_name: 'Красота',
                    show_popup: false
                },
                {
                    c_id: 9,
                    icon: 'auto',
                    c_name: 'Автотовары',
                    show_popup: false
                },
                {
                    c_id: 10,
                    icon: 'child-e',
                    c_name: 'Детская электроника',
                    show_popup: false
                },
                {
                    c_id: 11,
                    icon: 'toys',
                    c_name: 'Игрушки',
                    show_popup: false
                },
                {
                    c_id: 12,
                    icon: 'jewelry',
                    c_name: 'Ювелирные изделия',
                    show_popup: false
                },
                {
                    c_id: 13,
                    icon: 'boots',
                    c_name: 'Обувь',
                    show_popup: false
                },
                {
                    c_id: 14,
                    icon: 'food',
                    c_name: 'Продукты',
                    show_popup: false
                },
                {
                    c_id: 15,
                    icon: '18',
                    c_name: 'Товары для взрослых',
                    show_popup: false
                },
                {
                    c_id: 16,
                    icon: 'acs',
                    c_name: 'Аксессуары',
                    show_popup: false
                },
                {
                    c_id: 17,
                    icon: 'zoo',
                    c_name: 'Зоотовары',
                    show_popup: false
                },
                {
                    c_id: 18,
                    icon: 'pen',
                    c_name: 'Канцтовары',
                    show_popup: false
                },
                {
                    c_id: 19,
                    icon: 'el',
                    c_name: 'Электроника',
                    show_popup: false
                },
                {
                    c_id: 20,
                    icon: 'health',
                    c_name: 'Здоровье',
                    show_popup: false
                },
                {
                    c_id: 21,
                    icon: 'premium',
                    c_name: 'Premium',
                    show_popup: false
                }
            ],
            categories: []
        }
    },
    components: {
        FadeTransition,
        TreeView
    },
    methods: {
        openPopup(id) {
            this.catalog_items.forEach(item => {
                if (item.c_id == id) {
                    item.show_popup = true
                }
                else {
                    if (item.show_popup) {
                        item.show_popup = false
                    }
                }
            })
        },
        closePopups() {
            this.catalog_items.forEach(item => {
                if (item.show_popup) {
                    item.show_popup = false
                }
            })
        },
        getCategory(id) {
            return this.categories.find(item => item.c_id == id)
        }
    },
    async mounted() {
        // let data = await api.getCategories(0)
        
        // let c = categories.map(item => ({
        //     ...item,
        //     show_popup: false
        // }))

        // this.categories = c.map(item => ({
        //     ...item,
        //     checked: false,
        //     show: true
        // }))

        this.categories = [...categories]

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
        margin: 12px 0;
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: rgba(0, 0, 0, 0.9);
        position: relative;
    }

    .catalog-item-button {
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        transition: 0.1s;
    }

    .catalog-item-button:hover {
        color: #316D92;;
    }

    .catalog-item-button > img {
        margin-right: 12px;
    }

    .catalog-item-popup {
        position: absolute;
        width: 400px;
        height: 312px;
        left: -8px;
        top: -17px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.02);
        box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        z-index: 100;
    }
</style>