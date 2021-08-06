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
                    <div class="table-settings__content">

                    </div>
                    <div class="table-settings__footer">
                        <button class="btn-outline">Сбросить</button>
                        <button class="btn-blue">Применить</button>
                    </div>
                </div>
        </div>
    </slide-x-right-transition>
</template>

<script>
import { SlideXRightTransition } from 'vue2-transitions'
import AppSelect from '@/components/AppSelect.vue';

export default {
    props: ['show'],
    data() {
        return {
            filters_select: [
                {
                    id: 1,
                    title: 'Фильтр 1'
                },
                {
                    id: 2,
                    title: 'Фильтр 2'
                },
                {
                    id: 3,
                    title: 'Фильтр 3'
                }
            ],
            filters_model: null
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
    },
    watch: {
        show(newVal) {
            if (newVal) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "auto";
        }
    },
    components: {
        SlideXRightTransition,
        AppSelect
    }
}
</script>

<style>

</style>