<template>
  <header class="header">
      <div class="header__search-block">
          <div class="header__search-settings">
              <div 
                class="header__search-settings-button"
                :class="{'header__search-settings-button-active': show_settings_popup}"
                @click="toogleSettingsPopup"
            >
                <div class="header__search-settings-indicator"></div>
                <div class="header__search-settings-text">
                    Настройки поиска
                </div>
                <img :src="require(`@/assets/images/header/arrow.svg`)">
              </div>
              <div class="header__search-settings-popup" v-if="show_settings_popup" v-click-outside="toogleSettingsPopup">
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_wb}">
                    <checkbox v-model='cb_wb' title='Wildberries' />
                  </div>
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_ozon}">
                    <checkbox v-model='cb_ozon' title='OZON' />
                  </div>
                  <div class="header__search-settings-popup-line"></div>
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_category}">
                    <checkbox v-model='cb_category' title='Категории' />
                  </div>
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_products}">
                    <checkbox v-model='cb_products' title='Товары' />
                  </div>
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_brands}">
                    <checkbox v-model='cb_brands' title='Бренды' />
                  </div>
                  <div class="header__search-settings-popup-item" :class="{'header__search-settings-popup-item-active': cb_sellers}">
                    <checkbox v-model='cb_sellers' title='Продавцы' />
                  </div>
                  <div class="header__search-settings-popup-line"></div>
                  <button class="btn-outline header__search-settings-popup-btn">
                      Сбросить
                  </button>
                  <button class="btn-blue header__search-settings-popup-btn">
                      Применить
                  </button>
              </div>
          </div>
          <input 
            type="text" 
            class="header__search-input"
            placeholder="Глобальный поиск: по товарам, категориям, SKU, брендам и продавцам"
            v-model="header_search"
          >
          <button class="header__search-btn">
              <img :src="require(`@/assets/images/header/search.svg`)">
          </button>
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

export default {
    data() {
        return {
            header_search: '',
            cb_wb: false,
            cb_ozon: true,
            cb_category: true,
            cb_products: false,
            cb_brands: false,
            cb_sellers: false,
            show_settings_popup: false
        }
    },
    methods: {
        toogleSettingsPopup() {
            this.show_settings_popup = !this.show_settings_popup
        }
    },
    created() {
        const onClickOutside = e => this.show_settings_popup = this.$el.contains(e.target) && this.show_settings_popup;
        document.addEventListener('click', onClickOutside);
        this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
    },
    components: {
        Checkbox
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
    }

    .header__search-settings {
        
        width: 193px;
        background: #FAFAFA;
        border-radius: 4px;
        position: relative;
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
    }

    .header__search-settings-button:hover {
        background: #E1E1E1;
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

    .header__search-settings-text {
        margin: 0 12px;
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
</style>