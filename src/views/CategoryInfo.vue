<template>
  <div class="cat-info">
      <div class="cat-info__title">
          <div class="main-title">
              Обзор показателей по категории <span class="blue-text">{{ main_cat }}</span>
          </div>
          <range-calendar 
            v-model='calendar'
          />
      </div>
      <div class="cat-info__tabs">
          <app-tabs 
            :tabs=tabs_charts
            v-model=tabs_charts_active
          >
            <fade-transition>
                <app-select 
                    :items="select_chart_items"
                    v-model="select_chart_model"
                    v-if="tabs_charts_active == tabs_charts[1]"
                />
            </fade-transition>
        </app-tabs>
      </div>
      <div class="cat-info__cells" v-if="tabs_charts_active == tabs_charts[0]">
          <cell-info 
            title="Продажи"
            info="1 385 "
            infoMin="шт."
            color="red"
          />
          <cell-info 
            title="Выручка"
            info="2,4 млн "
            infoMin="руб."
            color="yellow"
          />
          <cell-info 
            title="Товаров"
            info="1 385 "
            infoMin="шт."
            color="blue"
          />
          <cell-info 
            title="Продавцов"
            info="287"
            color="fiolet"
          />
      </div>
      <div class="cat-info__chart">
          <line-chart 
            v-if="tabs_charts_active == tabs_charts[1]" 
            :chartData="chartData" 
            :options="chartOptions"
            :height="350"
          />
      </div>
      <div class="main-title">
            Таблица продаж по категории
      </div>
      <div class="cat-info__tabs">
          <app-tabs 
            :tabs=tabs_tables
            v-model=tabs_tables_model
          >
            <button class="btn-outline btn-width-auto">
                <img :src="require(`@/assets/images/icons/save.svg`)">
                Сохранить
            </button>
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
        </app-tabs>
      </div>
      <div class="cat-info__tables">
          <category-table 
            :config="activeTable"
            v-if="activeTable.data"
          />
      </div>
      <table-settings-collumns 
        :show="show_table_settings_collumns" 
        @close="show_table_settings_collumns=false"
        v-model="activeTable.head"
      />
      <table-settings-filters
        :show="show_table_settings_filters"
        @close="show_table_settings_filters=false"
      />
      <selected-table-items
        v-if="selectedItems.length > 0"
        :items="selectedItems"
        @deselect="deselect"
      />
  </div>
</template>

<script>
import AppTabs from '@/components/AppTabs.vue';
import AppSelect from '@/components/AppSelect.vue';
import RangeCalendar from '@/components/RangeCalendar.vue';
import CellInfo from '@/components/CellInfo.vue';
import CategoryTable from '@/components/CategoryTable.vue';
import { FadeTransition } from 'vue2-transitions'
import LineChart from '@/components/charts/LineChart.vue'
import TableSettingsFilters from '@/components/TableSettingsFilters.vue'
import TableSettingsCollumns from '@/components/TableSettingsCollumns.vue'
import SelectedTableItems from '@/components/SelectedTableItems.vue'

import { category_table_product, category_brand_product } from '@/fake'

export default {
    data() {
        return {
            main_cat: 'Карнавальные костюмы',
            filter_date_from: '25.03.21',
            filter_date_to: '25.04.21',
            calendar: ['', ''],
            tabs_charts: [
                {
                    id: 1,
                    title: 'Сводка за период'
                },
                {
                    id: 2,
                    title: 'Динамика показателей'
                }
            ],
            tabs_charts_active: null,
            select_chart_items: [
                {
                    id: 1,
                    title: 'Выручка (руб.)'
                },
                {
                    id: 2,
                    title: 'Количество товаров'
                },
                {
                    id: 3,
                    title: 'Количество продавцов'
                },
                {
                    id: 4,
                    title: 'Количество брендов'
                },
                {
                    id: 5,
                    title: 'Продажи (шт.)'
                }
            ],
            select_chart_model: null,
            tabs_tables: [
                {
                    id: 1,
                    title: 'Товары'
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
                    title: 'Подкатегории'
                },
            ],
            tabs_tables_model: {
                                id: 1,
                                title: 'Товары'
                            },
            chartData: {
                labels: [
                '01.10.2021',
                '02.10.2021',
                '03.10.2021',
                '04.10.2021',
                '05.10.2021',
                '06.10.2021',
                '07.10.2021',
                '08.10.2021',
                '09.10.2021',
                '10.10.2021',
                '11.10.2021',
                '12.10.2021'
                ],
                datasets: [
                {
                    borderColor: "#FAAB31",
                    pointBackgroundColor: "#FAAB31",
                    pointBorderColor: "#FFFFFF",
                    data: [505200, 836100, 695210, 734000, 430500, 880690, 570000, 610000, 520000, 735000, 660000, 526800]
                }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                elements: {
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            callback: function(value) {
                                return value > 0 ? value.toString().substring(0, value.toString().length - 3) + ' тыс.' : value;
                            }
                        },
                    }]
                },
                tooltips: {
                    intersect: false,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.6)',
                    caretSize: 0,
                    backgroundColor: '#ffffff',
                    xPadding: 16,
                    yPadding: 12,
                    displayColors: false,
                    titleFontFamily: 'Ubuntu',
                    titleFontSize: 14,
                    titleFontColor: 'rgba(0, 0, 0, 0.6)',
                    titleFontStyle: 'normal',
                    bodyFontFamily: 'Ubuntu',
                    bodyFontSize: 14,
                    bodyFontColor: 'rgba(0, 0, 0, 0.9)',
                    bodyFontStyle: 'bold',
                    callbacks: {
                        label: function(data) {
                            return data.value.slice(0, -3) + ' тыс руб'
                        },
                    },
                }
            },
            show_table_settings_collumns: false,
            show_table_settings_filters: false,
            tables_data: [
                {
                    id: 1,
                    table_data: {}
                },
                {
                    id: 2,
                    table_data: {}
                },
                {
                    id: 3,
                    table_data: {}
                },
                {
                    id: 4,
                    table_data: {}
                }
            ],
        }
    },
    methods: {
        deselect() {
            this.activeTable.data.forEach(el => {
                el.checked = false
            })
            this.select_all = false
        }
    },
    mounted() {
        let data = [...category_table_product.data, ...category_table_product.data, ...category_table_product.data]
        data = [...data, ...data]
        data = [...data, ...data, ...data, ...data]
        data = [...data, ...data, ...data]
        data = JSON.parse(JSON.stringify(data))
        data.forEach((el, index) => {
            el.id = index
        });
        this.tables_data[0].table_data = category_table_product
        this.tables_data[0].table_data.data = data

        this.tables_data[1].table_data = category_brand_product

        // генерируем данные для графика
        const rand = () => Math.floor(Math.random( ) * (900 - 100 + 1)) + 100
        let labels = []
        let arr_data = []
        for (let i = 1; i < 31; i++) {
            labels.push(`${i}.08.2021`)
            arr_data.push(rand() * 1000)
        }
        this.chartData= {
                labels: [...labels],
                datasets: [
                {
                    borderColor: "#FAAB31",
                    borderWidth: 2,
                    pointBackgroundColor: "#FAAB31",
                    pointBorderColor: "#FFFFFF",
                    data: [...arr_data]
                }
                ]
            }
    },
    computed: {
        activeTable() {
            let t = this.tables_data.find(item => item.id == this.tabs_tables_model.id)
            return t ? t.table_data: null
        },
        selectedItems() {
            if (this.activeTable && this.activeTable.data) {
                let res = []
                this.activeTable.data.forEach(el => {
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
        AppTabs,
        AppSelect,
        RangeCalendar,
        CellInfo,
        CategoryTable,
        FadeTransition,
        LineChart,
        TableSettingsFilters,
        TableSettingsCollumns,
        SelectedTableItems
    }
}
</script>

<style lang="scss">
    .cat-info {
        width: calc(100vw - 200px);;
        padding: 30px 24px;
        display: flex;
        flex-flow: column nowrap;
    }

    .btn-calendar {
        width: 180px;
        height: 32px;
    }

    .cat-info__title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .cat-info__tabs {
        margin-top: 32px;
    }

    .cat-info__cells {
        display: flex;
        flex-flow: row nowrap;
        gap: 16px;
        margin-top: 32px;
        margin-bottom: 48px;
    }

    .cat-info__tables {
        margin-top: 32px;
    }

    .cat-info__chart {
        width: 100%;
        margin-top: 32px;
        margin-bottom: 48px;
    }
</style>