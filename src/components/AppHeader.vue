<template>
  <header class="header">
      <div class="header__search-block" :class="{'header__search-block-active': input_focused}">
          <div class="header__search-settings">
              <div 
                class="header__search-settings-button"
                :class="{'header__search-settings-button-active': show_settings_popup}"
                @click="toogleSettingsPopup"
            >
                <div 
                    class="header__search-settings-indicator"
                    :class="{'header__search-settings-indicator-active': activeSettingsIndicator}"    
                ></div>
                <div class="header__search-settings-text">
                    Настройки поиска
                </div>
                <img :src="require(`@/assets/images/header/arrow.svg`)">
              </div>
              <slide-y-up-transition>
                <div class="header__search-settings-popup" v-if="show_settings_popup" v-click-outside="toogleSettingsPopup">
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_wb' title='Wildberries' />
                    </div>
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_ozon' title='OZON' />
                    </div>
                    <div class="header__search-settings-popup-line"></div>
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_category' title='Категории' />
                    </div>
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_products' title='Товары' />
                    </div>
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_brands' title='Бренды' />
                    </div>
                    <div class="header__search-settings-popup-item">
                        <checkbox v-model='cb_sellers' title='Продавцы' />
                    </div>
                    <div class="header__search-settings-popup-line"></div>
                    <button class="btn-outline header__search-settings-popup-btn" @click.stop="resetSettings">
                        Сбросить
                    </button>
                    <button class="btn-blue header__search-settings-popup-btn" @click.stop="applySettings">
                        Применить
                    </button>
                </div>
              </slide-y-up-transition>
          </div>
          <input 
            type="text" 
            class="header__search-input"
            :placeholder="textPlaceholder"
            v-model="header_search"
            @focus="focus_input"
            @blur="unfocus_input"
            @input="change_input"
          >
          <button class="header__search-btn">
              <img :src="require(`@/assets/images/header/search.svg`)">
          </button>
          <slide-y-up-transition>
              <div class="header__search-result" v-if="show_search_result">
                  <div 
                    class="header__search-result-item"
                    v-for="(res, i) in search_results"
                    :key="i"
                >
                    <span class="header__search-result-title">{{ res.title }}</span>
                    <span class="header__search-result-type">{{ res.type }}</span>
                </div>
              </div>
          </slide-y-up-transition>
      </div>
      <div class="header__user">
          <img :src="require(`@/assets/images/header/user.svg`)" alt="User">
          <span class="header__user-email">
            antonio888@gmail.com
          </span>
          <img :src="require(`@/assets/images/header/arrow.svg`)">
      </div>
  </header>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
    data() {
        return {
            header_search: '',
            cb_wb: true,
            cb_ozon: true,
            cb_category: true,
            cb_products: true,
            cb_brands: true,
            cb_sellers: true,
            show_settings_popup: false,
            search_params: {
                wb: true,
                ozon: true,
                category: true,
                products: true,
                brands: true,
                sellers: true
            },
            input_focused: false,
            show_search_result: false,
            search_results: [
                {
                    title: 'Мультиварка',
                    type: 'Категория / Wildberries'
                },
                {
                    title: 'Мультиварка',
                    type: 'Категория / Ozon'
                },
                {
                    title: 'Мультиварка Midea',
                    type: 'Товар / SKU 21654321 / Wildberries'
                },
                {
                    title: 'Мультиварка Vitek',
                    type: 'Товар / SKU 21654321 / Wildberries'
                },
                {
                    title: 'Мультиварка Polaris',
                    type: 'Товар / SKU 21654321 / Wildberries'
                },
            ]
        }
    },
    methods: {
        toogleSettingsPopup() {
            this.show_settings_popup = !this.show_settings_popup
        },
        resetSettings() {
            this.cb_wb = true
            this.cb_ozon = true
            this.cb_category = true
            this.cb_products = true
            this.cb_brands = true
            this.cb_sellers = true
        },
        applySettings() {
            this.search_params.wb = this.cb_wb
            this.search_params.ozon = this.cb_ozon
            this.search_params.category = this.cb_category
            this.search_params.brands = this.cb_brands
            this.search_params.sellers = this.cb_sellers
            this.search_params.products = this.cb_products
            this.show_settings_popup = false
        },
        focus_input() {
            this.input_focused=true
            if (this.header_search.length > 0) this.show_search_result=true
        },
        unfocus_input() {
            this.input_focused=false
            this.show_search_result=false
        },
        change_input() {
            if (this.header_search.length == 0) this.show_search_result=false
            if (this.header_search.length > 0 & !this.show_search_result) this.show_search_result=true
        }
    },
    created() {
        const onClickOutside = e => this.show_settings_popup = this.$el.contains(e.target) && this.show_settings_popup;
        document.addEventListener('click', onClickOutside);
        this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
    },
    computed: {
        activeSettingsIndicator() {
            return !(this.search_params.wb & this.search_params.ozon & 
                this.search_params.category & this.search_params.products & 
                this.search_params.brands & this.search_params.sellers)
        },
        textPlaceholder() {
            if (this.search_params.wb & this.search_params.ozon & 
                this.search_params.category & this.search_params.products & 
                this.search_params.brands & this.search_params.sellers) {
                    return 'Глобальный поиск: по товарам, категориям, SKU, брендам и продавцам'
            }
            else {
                let res = 'Глобальный поиск: по '
                if (this.search_params.wb) res += 'Wildberries, '
                if (this.search_params.ozon) res += 'OZON, '
                if (this.search_params.category) res += 'категориям, '
                if (this.search_params.brands) res += 'брендам, '
                if (this.search_params.sellers) res += 'продавцам, '
                if (this.search_params.products) res += 'товарам, '

                return res.substring(0, res.length-2)
            }
            
        }
    },
    components: {
        Checkbox,
        SlideYUpTransition
    }
}
</script>

<style lang="scss">
    .header {
        width: 100%;
        height: 85px;
        background: #FBFBFB;
        box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.12);
        padding: 0 24px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .header__user {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: pointer;
        margin-left: auto;

        & > img {
            margin-top: 1px;
        }
    }

    .header__user-email {
        margin: 0 8px;
        font-family: 'PT Sans';
        font-weight: 800;
        font-size: 1.4rem;
    }

    .header__search-block {
        background: #FFFFFF;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        height: 44px;
        width: 810px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0 2px;
        transition: 0.4s;
        position: relative;
    }

    .header__search-block-active {
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.42);
    }

    .header__search-settings {
        
        width: 193px;
        background: #FAFAFA;
        border-radius: 4px;
        position: relative;
        height: 36px;
        margin: 4px 0;
        display: flex;
        align-items: center;
    }

    .header__search-settings-button {
        font-family: 'Ubuntu';
        font-weight: 400;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 7px 12px;
        border-radius: 4px;
        transition: 0.4s;
    }

    .header__search-settings-button:hover {
        background: darken(#FAFAFA, 8%);
    }

    .header__search-settings-button-active {
        background: #E1E1E1;
    }

    .header__search-settings-indicator {
        width: 6px;
        height: 6px;
        background: #192535;
        opacity: 0.3;
        border-radius: 32px;
    }

    .header__search-settings-indicator-active {
        background: #E54247;
        opacity: 1;
    }

    .header__search-settings-text {
        margin: 0 12px;
        color: #3a3a3a;
    }

    .header__search-input {
        border: none;
        flex: 1;
        margin: 0 12px;
    }

    .header__search-btn {
        width: 40px;
        height: 40px;
        background: #E54247;
        border-radius: 4px;

        & > img {
            width: 30px;
            height: 30px;
            margin-top: 6px;
        }
    }

    .header__search-btn:hover {
        background: darken(#E54247, 8%);
    }

    .header__search-settings-popup {
        position: absolute;
        left: 0;
        top: 35px;
        width: 240px;
        padding: 4px 0;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
        z-index: 50;
    }

    .header__search-settings-popup-item {
        padding: 6px 12px;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: rgba(0, 0, 0, 0.9);
    }

    .header__search-settings-popup-line {
        width: 100%;
        height: 1px;
        background: #F0F0F0;
        margin: 6px 0;
    }

    .header__search-settings-popup-item-active {
        background: #F0F5FF;
    }

    .btn-outline.header__search-settings-popup-btn,
    .btn-blue.header__search-settings-popup-btn {
        width: 216px;
        margin: 8px 12px 0 12px;
    }

    .header__search-result {
        position: absolute;
        width: 610px;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 4px 0;
        right: 0;
        top: 48px;
        z-index: 100;
        display: flex;
        flex-direction: column;
    }

    .header__search-result-item {
        height: 50px;
        padding: 6px 12px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .header__search-result-item:hover {
        background: darken(#ffffff, 5%);
    }

    .header__search-result-title {
        color: rgba(0, 0, 0, 0.9);
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
    }

    .header__search-result-type {
        color: rgba(0, 0, 0, 0.9);
        font-style: normal;
        font-weight: normal;
        font-size: 1.2rem;
        line-height: 1.6rem;
    }
</style>