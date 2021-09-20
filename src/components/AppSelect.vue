<template>
  <div class="select" :class="{'select-mini': mini}">
      <div 
        class="select__main" 
        :class="{'select-open': isOpen}"
        :style="{width: `${width}px`}"
        @click.stop="toggleSelect"
      >
          {{ checked ? title : selectedItem.title }}
          <svg class="select-arrow" :class="{'select-arrow-mini': mini}" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.293 0.439453L5.99997 4.73245L1.70697 0.439453L0.292969 1.85345L5.99997 7.56045L11.707 1.85345L10.293 0.439453Z" fill="black"/>
          </svg>
      </div>
      <slide-y-up-transition>
        <div class="select__popup" :class="{'select__popup-up': openUp}" v-if="isOpen" v-click-outside="closeSelect">
            <div 
                v-for="i in items"
                :key="i.id"
                class="select__item"
                :class="{'select__item-active': selectedItem==i}"
                @click.stop="selectItem(i)"
                v-show="!checked"
            >
                {{ i.title }}
            </div>
            <div 
                v-for="i in items"
                :key="`cb${i.id}`"
                class="select__item"
                @click.stop="checkItem"
                v-show="checked"
            >
                <checkbox 
                    v-model="i.checked"
                    :title="i.title"
                    :color="i.color"
                />
            </div>
        </div>
      </slide-y-up-transition>
  </div>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions'
import Checkbox from '@/components/Checkbox.vue'

export default {
    model: {
        prop: 'modelValue',
        event: 'select'
    },
    props: {
        items: {
            required: true
        }, 
        modelValue: {
            default: null
        },
        default: {
            default: 1
        },
        openUp: {
            type: Boolean,
            default: false
        },
        mini: {
            type: Boolean,
            default: false
        },
        width: {
            default: 200
        },
        checked: {
            required: false,
            default: false,
            type: Boolean
        },
        title: {
            required: false,
            default: '',
            type: String
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        selectedItem() {
            if (this.modelValue instanceof Object) {
                return this.modelValue
            }
            return this.items.find(item => item.id == this.default)
        }
    },
    methods: {
        checkItem() {
            this.$emit('select', this.items)
        },
        selectItem(item) {
            this.$emit('select', item)
            this.closeSelect()
        },
        closeSelect() {
            this.isOpen = false
        },
        openSelect() {
            this.isOpen = true
        },
        toggleSelect() {
            this.isOpen = !this.isOpen
        }
    },
    components: {
        SlideYUpTransition,
        Checkbox
    }
}
</script>

<style lang="scss" scoped>
    .select {
        position: relative;
        // height: 32px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        letter-spacing: -0.01em;
        color: rgba(0, 0, 0, 0.9);
        cursor: pointer;
    }

    .select.select-mini {
        height: 24px;
    }

    .select__main {
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

    .select.select-mini > .select__main {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        box-shadow: none;
        padding: 0 8px;
    }

    .select__main:hover {
        background: darken(#FFFFFF, 7%);
    }

    .select-arrow {
        margin-left: 8px;
        transition: 0.4s;
    }

    .select-arrow-mini {
        margin-left: 6px;
        width: 7px;
    }

    .select-open {
        border: 1px solid #316D92;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
    }

    .select-open > .select-arrow {
        transform: rotateZ(180deg);
    }

    .select__popup {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        position: absolute;
        top: 36px;
    }

    .select__popup-up {
        top: auto;
        bottom: 30px;
    }

    .select__item {
        height: 32px;
        padding: 5px 12px;
        transition: 0.4s;
    }

    .select__item:hover {
        background: #F0F5FF;
    }
</style>