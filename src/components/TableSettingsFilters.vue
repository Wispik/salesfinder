<template>
    <slide-x-right-transition>
        <div class="table-settings" v-if="show">
                <div class="table-settings__bg" @click.stop="close"></div>
                <div class="table-settings__block">
                    <div class="table-settings__header">
                        Фильтры
                        <app-select 
                            :items="filters_select"
                            v-model="filters_model"
                            width="250"
                        />
                        <svg class="table-settings__header-btn-close" @click.stop="close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0L10 7.5L2.5 0L0 2.5L7.5 10L0 17.5L2.5 20L10 12.5L17.5 20L20 17.5L12.5 10L20 2.5L17.5 0Z" fill="black" fill-opacity="0.65"/>
                        </svg>
                    </div>
                    <vue-custom-scrollbar class="" :settings="scrollSettings">
                        <div class="table-settings__filters-content">
                            <div 
                                class="table-settings__filters-item"
                                v-for="item in filterItems"
                                :key="item.id"
                            >
                                <div class="table-settings__filters-item-title">
                                    {{ item.title }}
                                </div>
                                <input 
                                    class="table-settings__filters-item-input"
                                    type="text" 
                                    v-model="item.model"
                                    v-show="item.type == 'input'"
                                    :placeholder="item.title"
                                >
                                <div 
                                    class="table-settings__filters-item-range-block"
                                    v-show="item.type == 'range'"    
                                >
                                    <div class="table-settings__filters-item-range-block-top">
                                        <div class="table-settings__filters-item-range-block-top-item">
                                            <span>От</span>
                                            <input 
                                                type="text"
                                                v-model="item.model[0]"
                                                :placeholder="item.model[0]"
                                            >
                                        </div>
                                        <div class="table-settings__filters-item-range-block-top-item">
                                            <span>До</span>
                                            <input 
                                                type="text"
                                                v-model="item.model[1]"
                                                :placeholder="item.model[1]" 
                                            >
                                        </div>
                                    </div>

                                    <!-- <vue-slider
                                        v-model="item.model"
                                        :enable-cross="false"
                                        :min="0"
                                        :max="100000"
                                        :interval="500"
                                        silent
                                    >
                                        <template v-slot:dot>
                                            <div class="custom-dot-slider"></div>
                                        </template>
                                        <template v-slot:tooltip="{ value }">
                                            <div class="custom-tooltip-slider">{{ value }}</div>
                                        </template>
                                    </vue-slider> -->
                                </div>
                                <filters-select 
                                    v-model="item.model"
                                    v-show="item.type == 'select'"
                                />
                            </div>
                        </div>
                        <div class="table-settings__input-save">
                            <input type="text" placeholder="Название фильтра для сохранения">
                            <div class="table-settings__input-save-btn" @click.stop="saveFilter">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 15.75H14.25C15.0773 15.75 15.75 15.0773 15.75 14.25V6C15.75 5.80125 15.6713 5.61 15.5303 5.46975L12.5303 2.46975C12.39 2.32875 12.1995 2.25 12 2.25H3.75C2.92275 2.25 2.25 2.92275 2.25 3.75V14.25C2.25 15.0773 2.92275 15.75 3.75 15.75ZM11.25 14.25H6.75V10.5H11.25V14.25ZM9.75 5.25H8.25V3.75H9.75V5.25ZM3.75 3.75H5.25V6.75H6.75H8.25H9.75H10.5H11.25V3.75H11.6895L14.25 6.3105L14.2507 14.25H12.75V10.5C12.75 9.67275 12.0773 9 11.25 9H6.75C5.92275 9 5.25 9.67275 5.25 10.5V14.25H3.75V3.75Z" fill="black" fill-opacity="0.9"/>
                                </svg>
                            </div>
                        </div>
                    </vue-custom-scrollbar>
                    <div class="table-settings__footer">
                        <button class="btn-outline" @click.stop="reset">Сбросить</button>
                        <button class="btn-blue" @click.stop="apply">Применить</button>
                    </div>
                </div>
        </div>
    </slide-x-right-transition>
</template>

<script>
import { SlideXRightTransition } from 'vue2-transitions'
import AppSelect from '@/components/AppSelect.vue';
import FiltersSelect from '@/components/FiltersSelect.vue';

// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        show: {
            required: true,
            type: Boolean
        },
        modelValue: {
            required: true
        }
    },
    data() {
        return {
            filters_select: [
                {
                    id: 1,
                    title: 'Нет сохраненных фильтров'
                }
            ],
            filters_model: null,
            scrollSettings: {
                suppressScrollX: true,
                suppressScrollY: false,
                wheelPropagation: false
            },
            tableData: [],
            filterItems: []
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        saveFilter() {

        },
        reset() {
            this.tableData = JSON.parse(JSON.stringify(this.modelValue))
            this.generate()
        },
        apply() {
            this.$emit('change', this.tableData)
            this.close()
        },
        generate() {
            const isNum = (item) => typeof item === 'number' || item.slice(-1) === '₽'
            this.filterItems = []
            for (let i = 0; i < this.modelValue.head.length; i++) {
                let el = this.modelValue.head[i]
                if (el.name == 'warehouse') {
                    this.filterItems.push({
                        id: this.filterItems.length,
                        title: el.title,
                        name: el.name,
                        type: 'select',
                        model: [
                            {
                                id: 1,
                                title: 'Склад продавца',
                                selected: true
                            },
                            {
                                id: 2,
                                title: 'Коледино WB',
                                selected: true
                            },
                            {
                                id: 3,
                                title: 'Санкт-Петербург WB',
                                selected: true
                            },
                            {
                                id: 4,
                                title: 'Электросталь WB',
                                selected: true
                            }
                        ]
                    })
                }
                else
                {
                    if (isNum(this.modelValue.data[0][el.name])) {
                        this.filterItems.push({
                            id: this.filterItems.length,
                            title: el.title,
                            name: el.name,
                            type: 'range',
                            model: [0, 100000]
                        })
                    }
                    else
                    {
                        this.filterItems.push({
                            id: this.filterItems.length,
                            title: el.title,
                            name: el.name,
                            type: 'input',
                            model: ''
                        })
                    }
                }
            }
        }
    },
    watch: {
        show(newVal) {
            if (newVal) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "auto";
        },
        modelValue(newVal) {
            if (newVal) {
                this.tableData = JSON.parse(JSON.stringify(newVal))
                if (this.tableData.head)
                    this.generate()
            }
            else
                this.tableData = []
        }
    },
    components: {
        SlideXRightTransition,
        AppSelect,
        // VueSlider,
        FiltersSelect
    }
}
</script>

<style lang="scss">
    .table-settings__filters-drag-block {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .table-settings__filters-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
    }

    .table-settings__input-save {
        display: flex;
        flex-flow: row nowrap;
        padding: 3px;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        margin: 24px;

        & > input {
            flex: 1;
            margin: 0 12px;
            border: none;
            font-size: 1.4rem;
        }
    }

    .table-settings__input-save-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.4s;
        background: #FAFAFA;
        border-radius: 4px;

        &:hover {
            background: darken(#FAFAFA, 10%);
        }
    }

    .table-settings__filters-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: normal;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #333333;
    }

    .table-settings__filters-item-input {
        width: 100%;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 1.4rem;
        transition: 0.4s;

        &:focus {
            border: 1px solid #316D92;
        }
    }

    .table-settings__filters-drag-block {
        height: 100%;
        flex: 1;
    }

    .table-settings__filters-item-range-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .table-settings__filters-item-range-block-top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
    }

    .table-settings__filters-item-range-block-top-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-weight: 500;
        font-size: 1.4rem;
        gap: 6px;

        & > input {
            width: 100%;
            height: 38px;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            padding: 8px 12px;
            transition: 0.4s;

            &:focus {
                border: 1px solid #316D92;
            }   
        }
    }

    .custom-dot-slider {
        width: 14px;
        height: 14px;
        background: #ffffff;
        border: 2px solid #316D92;
        border-radius: 100px;
    }

    .custom-tooltip-slider {
        background: #ffffff;
        font-size: 1.2rem;
    }

    .vue-slider-process {
        background: #316D92 !important;
    }

    .vue-slider-dot-tooltip-top {
        top: 30px !important;
    }

    .table-settings__filters-item-title {
        font-weight: 500;
    }
</style>