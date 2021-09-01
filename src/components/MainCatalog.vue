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
import api from '@/api'

export default {
    data() {
        return {
            catalog_items: [],
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
                if (item.id == id) {
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
        let data = await api.getCategories(0)
        
        this.catalog_items = data.data.map(item => ({
            ...item,
            show_popup: false
        }))

        this.categories = this.catalog_items.map(item => ({
            ...item,
            checked: false,
            show: true
        }))

        console.log(this.categories)
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