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
                    checked
                    title="Параметры на графике"
                    width=220
                />
            </fade-transition>
            </app-tabs>
        </div>
        <div v-if="tabs_charts_active == tabs_charts[0]" class="cat-info__tab-block">
            <div class="cat-info__analysis">
                <div class="cat-info__analysis-title">
                    Анализ категории
                </div>
                <div class="cat-info__analysis-item">
                    Кол-во товаров
                    <span>
                        12040
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Кол-во продавцов
                    <span>
                        1977
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Кол-во брендов
                    <span>
                        2018
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Всего продаж, шт
                    <span>
                        5539
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Сумма выручки, руб
                    <span>
                        15 987 840
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Средняя выручка на товар, руб
                    <span>
                        2 886
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Среднее продаж в день, шт
                    <span>
                        791
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Средняя выручка в день, руб
                    <span>
                        2 283 977
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Средний рейтинг товаров
                    <span>
                        4
                    </span>
                </div>
                <div class="cat-info__analysis-item">
                    Сумма упущенной выручки, руб
                    <span>
                        49 158 036 971
                    </span>
                </div>
            </div>
            <div class="cat-info__mini-charts">
                <cell-info 
                    title="Кол-во товаров"
                    data="12040"
                    color="red"
                />
                <cell-info 
                    title="Кол-во продавцов"
                    data="1977"
                    color="blue"
                />
                <cell-info 
                    title="Кол-во брендов"
                    data="2018"
                    color="fiolet"
                />
                <cell-info 
                    title="Сумма выручки, руб"
                    data="15 987 840"
                    color="purple"
                />
            </div>
        </div>
        <div v-if="tabs_charts_active == tabs_charts[1]" class="cat-info__chart">
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
            v-model="activeTable"
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
import { FadeTransition } from 'vue2-transitions'
import CellInfo from '@/components/CellInfo2.vue';
import LineChart from '@/components/charts/LineChart.vue'
import TableSettingsFilters from '@/components/TableSettingsFilters.vue'
import TableSettingsCollumns from '@/components/TableSettingsCollumns.vue'
import SelectedTableItems from '@/components/SelectedTableItems.vue'
import CategoryTable from '@/components/CategoryTable.vue';

import { category_table_product, category_brand_product } from '@/fake'

export default {
    data() {
        return {
            main_cat: 'Карнавальные костюмы',
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
                    title: 'Выручка (руб.)',
                    checked: true,
                    color: '#F17078'
                },
                {
                    id: 2,
                    title: 'Количество товаров',
                    checked: false,
                    color: '#F98757'
                },
                {
                    id: 3,
                    title: 'Количество продавцов',
                    checked: false,
                    color: '#FAAB31'
                },
                {
                    id: 4,
                    title: 'Количество брендов',
                    checked: false,
                    color: '#FFCB86'
                },
                {
                    id: 5,
                    title: 'Продажи (шт.)',
                    checked: false,
                    color: '#215063'
                },
                {
                    id: 6,
                    title: 'Выручка на товар',
                    checked: false,
                    color: '#08979C'
                },
                {
                    id: 7,
                    title: 'Выручка в день',
                    checked: false,
                    color: '#5D9A8F'
                },
                {
                    id: 8,
                    title: 'Продаж в день',
                    checked: false,
                    color: '#715D9A'
                }
            ],
            select_chart_model: null,
            chartData: {
                labels: ['1'],
                datasets: [
                    {
                        borderColor: "#FAAB31",
                        pointBackgroundColor: "#FAAB31",
                        pointBorderColor: "#FFFFFF",
                        backgroundColor: "transparent",
                        data: [0]
                    }
                ],
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
            chartLabels: [],
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
            ]
        }
    },
    components: {
        RangeCalendar,
        FadeTransition,
        AppTabs,
        AppSelect,
        CellInfo,
        LineChart,
        TableSettingsFilters,
        TableSettingsCollumns,
        SelectedTableItems,
        CategoryTable
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


        const rand = () => Math.floor(Math.random( ) * (900 - 100 + 1)) + 100
        for (let i = 1; i < 30; i++) {
            this.chartLabels.push(`${i}.08.2021`)
        }
        this.select_chart_items.forEach(el => {
            el.chartdata = []
            for (let i = 1; i < 30; i++) {
                el.chartdata.push(rand() * 1000)
            }
        })
        this.updateChart()
    },
    methods: {
        updateChart() {
            let data = {
                labels: [...this.chartLabels],
                datasets: []
            }
            this.selectedChartItems.forEach(el => {
                data.datasets.push({
                    borderColor: el.color,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    pointBorderColor: "#FFFFFF",
                    data: [...el.chartdata]
                })
            })
            this.chartData = JSON.parse(JSON.stringify(data))
        },
        deselect() {
            this.activeTable.data.forEach(el => {
                el.checked = false
            })
        }
    },
    computed: {
        selectedChartItems() {
            return this.select_chart_items.filter(el => el.checked)
        },
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
    watch: {
        selectedChartItems() {
            this.updateChart()
        }
    }
}
</script>

<style lang="scss">
    .cat-info {
        width: calc(100vw - 200px);
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

    .cat-info__tab-block {
        display: flex;
        flex-flow: row nowrap;
        margin: 32px 0;
        gap: 24px;
    }

    .cat-info__analysis {
        display: flex;
        flex-direction: column;
        padding: 24px 20px;
        background: linear-gradient(0deg, rgba(241, 241, 241, 0.16), rgba(241, 241, 241, 0.16)), linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF;
        box-shadow: 0px 1px 2px -4px rgba(0, 0, 0, 0.06), 0px 2px 16px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        min-width: 420px;
        width: 40%;
        flex: 1;
    }

    .cat-info__analysis-title {
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.2rem;
        color: rgba(0, 0, 0, 0.9);
        margin-bottom: 18px;
    }

    .cat-info__analysis-item {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
        padding: 6px 0;

        & > span {
            color: #316D92;
            line-height: 124.5%;
            font-size: 1.8rem;
        }

        & + & {
            margin-top: 6px;
        }
    }

    .cat-info__mini-charts {
        display: flex;
        flex-flow: row wrap;
        gap: 16px;
        min-width: 652px;
        max-width: 966px;
    }
</style>