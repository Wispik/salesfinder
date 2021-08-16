<template>
    <slide-x-right-transition>
        <div class="table-settings" v-if="show">
                <div class="table-settings__bg" @click.stop="close">
                </div>
                <div class="table-settings__block">
                    <div class="table-settings__header">
                        Настройка вида таблицы
                        <svg class="table-settings__header-btn-close" @click.stop="close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0L10 7.5L2.5 0L0 2.5L7.5 10L0 17.5L2.5 20L10 12.5L17.5 20L20 17.5L12.5 10L20 2.5L17.5 0Z" fill="black" fill-opacity="0.65"/>
                        </svg>
                    </div>
                    <div class="table-settings__content">
                        <div class="table-settings__title">
                            Настройки отображения столбцов и их порядок
                        </div>
                        <vue-custom-scrollbar class="table-settings__columns-drag-block" :settings="scrollSettings">
                            <draggable v-model="tableData" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <div 
                                    v-for="el in tableData" 
                                    :key="el.id"
                                    class="table-settings__columns-drag-item"
                                >
                                    <checkbox v-model="el.show" :title="el.title"/>
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2H14" stroke="#A4A4AD" stroke-width="3" stroke-linecap="square"/>
                                        <path d="M2 7H14" stroke="#A4A4AD" stroke-width="3" stroke-linecap="square"/>
                                    </svg>
                                </div>
                                </transition-group>
                            </draggable>
                        </vue-custom-scrollbar>
                    </div>
                    <div class="table-settings__footer">
                        <button class="btn-outline" @click="reset">Сбросить</button>
                        <button class="btn-blue" @click="apply">Применить</button>
                    </div>
                </div>
        </div>
    </slide-x-right-transition>
</template>

<script>
import { SlideXRightTransition } from 'vue2-transitions'
import Draggable from 'vuedraggable'
import Checkbox from '@/components/Checkbox.vue'

export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    data() {
        return {
            drag: false,
            scrollSettings: {
                suppressScrollX: true,
                suppressScrollY: false,
                wheelPropagation: false
            },
            tableData: []
        }
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
    methods: {
        close() {
            this.$emit('close', this.tableData)
        },
        reset() {
            this.tableData = JSON.parse(JSON.stringify(this.modelValue))
        },
        apply() {
            this.tableData.forEach((el, index) => {
                el.position = index
            })
            console.log(this.tableData)
            this.$emit('change', this.tableData)
            this.close()
        }
    },
    computed: {
    dragOptions() {
        return {
            animation: 200,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
        };
        }
    },
    watch: {
        show(newVal) {
            if (newVal) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "auto";
        },
        modelValue(newVal) {
            this.tableData = JSON.parse(JSON.stringify(newVal))
        }
    },
    components: {
        SlideXRightTransition,
        Draggable,
        Checkbox
    }
}
</script>

<style lang="scss">
    .table-settings {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .table-settings__bg {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
    }

    .table-settings__block {
        position: absolute;
        top: 0;
        right: 0;
        width: 480px;
        height: 100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
    }

    .table-settings__header {
        height: 85px;
        border-bottom: 1px solid #D9D9D9;
        padding: 22px 24px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 300;
        font-size: 2.4rem;
        line-height: 2.8rem;
        color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .table-settings__header-btn-close {
        cursor: pointer;
    }
    
    .table-settings__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 24px;
        position: relative;
        height: calc(100% - 160px);
    }

    .table-settings__title {
        font-family: "Ubuntu";
        font-style: normal;
        font-weight: normal;
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: rgba(0, 0, 0, 0.9);
    }

    .table-settings__columns-drag-block {
        margin: 24px 0;
    }

    .table-settings__columns-drag-item {
        height: 40px;
        width: 100%;
        padding: 12px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        letter-spacing: -0.01em;
        color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: pointer;
        border: 1px solid #DCDCDE;
        border-radius: 4px;
    }

    .table-settings__columns-drag-item > .checkbox {
        flex: 1;
        margin-right: 15px;
        cursor: pointer;
    }

    .table-settings__columns-drag-item + .table-settings__columns-drag-item {
        margin-top: 16px;
    }

    .table-settings__footer {
        height: 84px;
        border-top: 1px solid #D9D9D9;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        padding: 24px;
    }

    .table-settings__footer > .btn-outline {
        width: 182px;
        height: 36px;
    }

    .table-settings__footer > .btn-blue {
        width: 150px;
        height: 36px;
        margin-left: 16px;
    }
</style>