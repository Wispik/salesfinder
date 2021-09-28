<template>
  <div class="ratings">
      <div class="main-title">
          Рейтинги
      </div>
      <div class="second-title mt8">
          Здесь вы можете построить рейтинги по различным параметрам и периодам времени
      </div>
      <div class="rating-tabs">
          <app-tabs 
            :tabs=tabs
            v-model=tabs_active
          />
      </div>
      <div class="rating-params">
          <app-select 
            :items="constructor_select_items"
            v-model="constructor_select_model"
            default=1
            width=288
            v-if="tabs_active && tabs_active.id==8"
          />
          <app-select 
            :items="select_items"
            v-model="select_model"
            default=5
            width=288
            v-else
          />
          <range-calendar 
            v-model='calendar'
          />
          <button class="btn-blue btn-get-rating" @click="analyze">
              Построить рейтинг
          </button>
      </div>
      <div class="rating-constructor" v-if="tabs_active && tabs_active.id==8">
          <div 
            class="rating-constructor__item"
            v-for="item in constructor"
            :key="item.id"
          >
            <app-select 
                :items="select_items"
                v-model="item.select_model"
                width=288
            />
            <label class="rating-constructor__item-label">
                От
                <input 
                    type="text" 
                    class="rating-constructor__item-input"
                    placeholder="100"
                    v-model="item.input_from"    
                >
            </label>
            <label class="rating-constructor__item-label">
                До
                <input 
                    type="text" 
                    class="rating-constructor__item-input"
                    placeholder="500"
                    v-model="item.input_to"    
                >
            </label>
            <img 
                class="rating-constructor__button-x"
                :src="require(`@/assets/images/icons/red circle_close.png`)"
                @click="deleteItemFromConstructor(item.id)"
                v-if="item.id != 1"
            >
          </div>
      </div>
      <div 
        class="rating-constructor__button" 
        @click="addItemToConstructor"
        v-if="tabs_active && tabs_active.id==8"
      >
          <img :src="require(`@/assets/images/icons/add_more.png`)">
          Добавить условие
      </div>
      <div class="ratings-table-block" v-show="show_table && tabs_active==tabs[0]">
          <div class="ratings-table__title">
              <div class="main-title">Таблица продаж по категории</div>
              <div class="ratings-table__title__buttons">
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
          <category-table 
            :config="table_data"
            :checked="false"
          />
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
      </div>
  </div>
</template>

<script>
import AppTabs from '@/components/AppTabs.vue';
import AppSelect from '@/components/AppSelect.vue';
import RangeCalendar from '@/components/RangeCalendar.vue';
import CategoryTable from '@/components/CategoryTable.vue';
import TableSettingsFilters from '@/components/TableSettingsFilters.vue'
import TableSettingsCollumns from '@/components/TableSettingsCollumns.vue'

import { ratings_table } from '@/fake'

export default {
    data() {
        return {
            tabs: [
                {
                    id: 1,
                    title: 'Категории'
                },
                {
                    id: 2,
                    title: 'Товары'
                },
                {
                    id: 3,
                    title: 'Новинки'
                },
                {
                    id: 4,
                    title: 'Бренды'
                },
                {
                    id: 5,
                    title: 'Продавцы'
                },
                {
                    id: 6,
                    title: 'Взлеты'
                },
                {
                    id: 7,
                    title: 'Падения'
                },
                {
                    id: 8,
                    title: 'Конструктор'
                }
            ],
            tabs_active: null,
            select_items: [
                {
                    id: 1,
                    title: 'Количество товаров'
                },
                {
                    id: 2,
                    title: 'Количество продавцов'
                },
                {
                    id: 3,
                    title: 'Количество брендов'
                },
                {
                    id: 4,
                    title: 'Сумма продаж (шт)'
                },
                {
                    id: 5,
                    title: 'Сумма выручки (руб)'
                },
                {
                    id: 6,
                    title: 'Средняя выручка на товар (руб)'
                },
                {
                    id: 7,
                    title: 'Среднее продаж в день (шт)'
                },
                {
                    id: 8,
                    title: 'Средняя выручка в день (руб)'
                },
                {
                    id: 9,
                    title: 'Средний рейтинг товаров'
                },
                {
                    id: 10,
                    title: 'Сумма упущенной выручки (руб)'
                }
            ],
            select_model: null,
            calendar: ['', ''],
            table_data: {},
            show_table_settings_collumns: false,
            show_table_settings_filters: false,
            show_table: false,
            constructor_select_items: [
                {
                    id: 1,
                    title: 'Категории'
                },
                {
                    id: 2,
                    title: 'Бренды'
                },
                {
                    id: 3,
                    title: 'Продавцы'
                },
                {
                    id: 4,
                    title: 'Товары'
                }
            ],
            constructor_select_model: null,
            constructor: [
                {
                    id: 1,
                    select_model: null,
                    input_from: '',
                    input_to: ''
                }
            ]
        }
    },
    mounted() {
        this.table_data = ratings_table
    },
    methods: {
        analyze() {
            this.show_table = true
        },
        addItemToConstructor() {
            this.constructor.push(
                {
                    id: this.constructor[this.constructor.length-1].id + 1,
                    select_model: null,
                    input_from: '',
                    input_to: ''
                }
            )
        },
        deleteItemFromConstructor(id) {
            let res = this.constructor.filter(item => item.id != id)
            this.constructor = [...res]
        }
    },
    components: {
        AppTabs,
        AppSelect,
        RangeCalendar,
        CategoryTable,
        TableSettingsFilters,
        TableSettingsCollumns
    }
}
</script>

<style lang="scss">
    .ratings {
        padding: 28px 24px;
    }

    .rating-tabs {
        margin-top: 48px;
    }

    .rating-params {
        display: flex;
        flex-flow: row nowrap;
        gap: 8px;
        margin-top: 32px;
        align-items: center;
    }

    .btn-get-rating {
        width: 196px;
        height: 34px;
    }

    .ratings-table__title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 32px;
    }

    .ratings-table__title__buttons {
        display: flex;
        flex-flow: row nowrap;
        gap: 8px;
    }

    .rating-constructor {
        display: flex;
        flex-direction: column;
    }

    .rating-constructor__item {
        display: flex;
        flex-flow: row nowrap;
        gap: 20px;
        align-items: center;
        margin-top: 20px;
    }

    .rating-constructor__item-label {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 6px;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        letter-spacing: -0.01em;
        color: rgba(0, 0, 0, 0.9);
    }

    .rating-constructor__item-input {
        width: 152px;
        padding: 8px 12px;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.9);
        font-size: 1.4rem;
        transition: 0.4s;

        &:focus {
            border: 1px solid #316D92
        }
    }

    .rating-constructor__button-x {
        cursor: pointer;
    }

    .rating-constructor__button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #316D92;
        font-size: 1.4rem;
        cursor: pointer;
        gap: 4px;
        margin-top: 20px;
        margin-left: 60px;

        & > img {
            width: 32px;
            height: 32px;
        }
    }
</style>