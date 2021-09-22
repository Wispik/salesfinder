<template>
    <div class="list-page" v-if="list">
        <div class="list-page__title">
            <router-link
                class="list-page__title-link"
                :to="{name: 'Lists'}"
            >
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9999 6.99997H4.41394L9.70694 1.70697L8.29294 0.292969L0.585938 7.99997L8.29294 15.707L9.70694 14.293L4.41394 8.99997H18.9999V6.99997Z" fill="black" fill-opacity="0.9"/>
                </svg>
                {{ list.title }}
            </router-link>
            <div class="list-page__title-buttons">
                <button 
                    class="btn-outline btn-width-auto"
                    @click.stop="show_table_settings_collumns=true"    
                >
                    <img :src="require(`@/assets/images/icons/settings.svg`)">
                    Вид
                </button>
                <button 
                    class="btn-outline btn-width-auto"
                    @click.stop="show_table_settings_filters=true"
                >
                    <img :src="require(`@/assets/images/icons/filters.svg`)">
                    Фильтры
                </button>
                <button class="btn-outline btn-width-auto">
                    <img :src="require(`@/assets/images/icons/export.svg`)">
                    Экспорт
                </button>
            </div>
        </div>
        <div class="list-page__table">
            <category-table 
                :config="table_data"
                v-if="table_data.data"
            />
        </div>
        <table-settings-collumns 
            :show="show_table_settings_collumns" 
            @close="show_table_settings_collumns=false"
            v-model="table_data.head"
        />
        <table-settings-filters
            :show="show_table_settings_filters"
            @close="show_table_settings_filters=false"
            v-model="table_data"
        />
        <selected-table-items
            v-if="selectedItems.length > 0"
            :items="selectedItems"
            @deselect="deselect"
            @delete="deleteItem"
            deleteButton
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableSettingsFilters from '@/components/TableSettingsFilters.vue'
import TableSettingsCollumns from '@/components/TableSettingsCollumns.vue'
import SelectedTableItems from '@/components/SelectedTableItems.vue'
import CategoryTable from '@/components/CategoryTable.vue';

import { category_table_product } from '@/fake'

export default {
    data() {
        return {
            list: null,
            show_table_settings_collumns: false,
            show_table_settings_filters: false,
            table_data: {}
        }
    },
    mounted() {
        this.list = this.USER_LISTS.find(item => item.id == this.$route.params.id)
        this.table_data = JSON.parse(JSON.stringify(category_table_product))
    },
    methods: {
        deselect() {
            this.table_data.data.forEach(el => {
                el.checked = false
            })
            this.select_all = false
        },
        deleteItem() {
            let data = []
            this.table_data.data.forEach(item => {
                if (!item.checked) {
                    data.push(item)
                }
            })
            this.table_data.data = [...data]
        }
    },
    computed: {
        ...mapGetters(['USER_LISTS']),
        selectedItems() {
            if (this.table_data && this.table_data.data) {
                let res = []
                this.table_data.data.forEach(el => {
                    if (el.checked) res.push(el)
                })
                return res
            }
            else
            {
                return []
            }
        }
    },
    components: {
        TableSettingsFilters,
        TableSettingsCollumns,
        SelectedTableItems,
        CategoryTable
    }
}
</script>

<style lang="scss" scoped>
    .list-page {
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: calc(100vw - 200px);
    }

    .list-page__title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .list-page__title-link {
        display: flex;
        align-items: center;
        gap: 11px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: 300;
        font-size: 2.4rem;
        line-height: 2.8rem;
        cursor: pointer;
        text-decoration: none;
    }

    .list-page__title-buttons {
        display: flex;
        gap: 8px;
    }

</style>