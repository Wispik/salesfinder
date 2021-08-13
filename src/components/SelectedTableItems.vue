<template>
    <fade-transition>
        <div class="items-popup">
            <div class="items-popup__text">
                Выбрано {{ compText }}
            </div>
            <button class="btn btn-outline">
                <img :src="require(`@/assets/images/icons/save.svg`)">
                Добавить в список
            </button>
            <button class="btn btn-table-popup" @click="deselectAll">
                Снять выбор
            </button>
        </div>
    </fade-transition>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    computed: {
        compText() {
            const len = this.items.length
            if ( len == 1 )
                return `${len} позиция`
            else if ( 2 < len < 4 )
                return `${len} позиции`
            else
                return `${len} позиций`
        }
    },
    methods: {
        deselectAll() {
            this.$emit('deselect')
        }
    },
    components: {
        FadeTransition
    }
}
</script>

<style lang="scss" scoped>
    .items-popup {
        position: fixed;
        width: 204px;
        height: 157px;
        right: 24px;
        bottom: 24px;
        background: #354052;
        opacity: 0.9;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;

        & > .btn, & > .btn-outline {
            width: 100%;
        }
    }

    .items-popup__text {
        margin-bottom: 8px;
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 1.4rem;
        line-height: 2.2rem;
        color: #FFFFFF;
    }

    .btn-table-popup {
        border: 1px solid #D9D9D9;
        filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12));
        border-radius: 4px;
        background: #354052;
        color: #FFFFFF;
        height: 32px;
    }
</style>