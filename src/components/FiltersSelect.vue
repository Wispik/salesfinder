<template>
  <div class="filters-select">
      <div 
        class="filters-select__main" 
        :class="{'filters-select-open': isOpen}"
        @click.stop="toggleSelect"
      >
          {{ title }}
          <svg class="filters-select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.293 0.439453L5.99997 4.73245L1.70697 0.439453L0.292969 1.85345L5.99997 7.56045L11.707 1.85345L10.293 0.439453Z" fill="black"/>
          </svg>
      </div>
      <slide-y-up-transition>
        <div class="filters-select__popup" v-if="isOpen" v-click-outside="closeSelect">
            <div class="filters-select__search">
                <input type="text" v-model="search" placeholder="Поиск по категориям">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.25 12.25L9.625 9.625M10.5 6.125C10.5 8.54125 8.54125 10.5 6.125 10.5C3.70875 10.5 1.75 8.54125 1.75 6.125C1.75 3.70875 3.70875 1.75 6.125 1.75C8.54125 1.75 10.5 3.70875 10.5 6.125Z" stroke="#333333" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div 
                v-for="i in filtersItems"
                :key="i.id"
                class="filters-select__item"
            >
                <checkbox 
                    v-model="i.selected"
                    :title="i.title"
                />
            </div>
            <div class="filters-select__bottom">
                <button class="btn btn-blue" @click="apply">Применить</button>
            </div>
        </div>
      </slide-y-up-transition>
  </div>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions'
import Checkbox from '@/components/Checkbox.vue';

export default {
    model: {
        prop: 'modelValue',
        event: 'select'
    },
    props: {
        modelValue: {
            default: null
        }
    },
    data() {
        return {
            isOpen: false,
            items: [],
            search: ''
        }
    },
    methods: {
        closeSelect() {
            this.isOpen = false
        },
        openSelect() {
            this.isOpen = true
            this.items = JSON.parse(JSON.stringify(this.modelValue))
            this.search = ''
        },
        toggleSelect() {
            this.isOpen = !this.isOpen
            this.items = JSON.parse(JSON.stringify(this.modelValue))
            this.search = ''
        },
        apply() {
            this.$emit('select', this.items)
            this.closeSelect()
        }
    },
    computed: {
        title() {
            let selected = [...this.modelValue].filter(item => item.selected)
            if (selected.length == 0)
                return 'Не выбрано'
            else if (selected.length == [...this.modelValue].length)
                return 'Выбраны все'
            else {
                let res = ''
                selected.forEach(el => {
                    if (res.length > 0) res += ', '
                    res += el.title
                });
                return res
            }
        },
        filtersItems() {
            if (this.search.length > 0) 
                return this.items.filter(item => item.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
            else
                return this.items
        }
    },
    // mounted() {
    //     this.items = [...this.modelValue]
    // },
    components: {
        SlideYUpTransition,
        Checkbox
    }
}
</script>

<style lang="scss" scoped>
    .filters-select {
        position: relative;
        height: 32px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        letter-spacing: -0.01em;
        color: rgba(0, 0, 0, 0.9);
        cursor: pointer;
    }

    .filters-select__main {
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        padding: 5px 12px 5px 8px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        transition: .4s;
    }

    .filters-select__main:hover {
        background: darken(#FFFFFF, 7%);
    }

    .filters-select-arrow {
        margin-left: 8px;
        transition: 0.4s;
    }

    .filters-select-open {
        border: 1px solid #316D92;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    }

    .filters-select-open > .filters-select-arrow {
        transform: rotateZ(180deg);
    }

    .filters-select__popup {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        position: absolute;
        top: 36px;
        z-index: 2000;
    }

    .filters-select__search {
        margin: 16px 12px;
        padding: 5px 12px;
        height: 32px;
        border: 1px solid #D9D9D9;
        border-radius: 2px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: auto;

        & > input {
            font-size: 1.4rem;
            flex: 1;
            margin-right: 12px;
            border: none;
        }
    }

    .filters-select__item {
        height: 32px;
        padding: 2px 12px;
        transition: 0.4s;
    }

    .filters-select__bottom {
        height: 64px;
        border-top: 1px solid #D9D9D9;
        padding: 16px 12px;
        display: flex;
        justify-content: flex-end;

        & > .btn-blue {
            height: 32px;
            width: 101px;
            padding: 0;
        }
    }
</style>