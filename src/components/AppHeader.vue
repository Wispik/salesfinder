<template>
  <header class="header">
      <div class="header__search-block">
          <div class="header__search-settings">
              <div class="header__search-settings-indicator"></div>
              <div class="header__search-settings-text">
                  Настройки поиска
              </div>
              <img :src="require(`@/assets/images/header/arrow.svg`)">
          </div>
          <input 
            type="text" 
            class="header__search-input"
            placeholder="Глобальный поиск: по товарам, категориям, SKU, брендам и продавцам"
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
export default {

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
        font-family: 'Ubuntu';
        font-weight: 400;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 7px 12px;
        width: 193px;
        background: #FAFAFA;
        border-radius: 4px;
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
        outline:none;
        margin: 0 12px;
        color: #333333;
        font-family: 'Ubuntu';
        font-size: 1.6rem;
        font-weight: 400;
        // width: 640px;
    }

    .header__search-btn {
        width: 40px;
        height: 40px;
        background: #E54247;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;

        & > img {
            width: 30px;
            height: 30px;
            margin-top: 6px;
        }
    }
</style>