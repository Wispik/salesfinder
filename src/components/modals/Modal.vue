<template>
    <fade-transition>
        <div class="modal">
            <div class="modal-bg" @click.self="$emit('close')" ></div>
            <div class="modal-body" :style="{width: `${width}px`}">
                <div class="modal-header">
                    <div class="modal-header__title">
                        {{ title }}
                    </div>
                    <div class="modal-btn-close" @click="$emit('close')" >
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.14318 13.5348L10.4998 11.1782L12.8565 13.5348L14.0348 12.3565L11.6782 9.99984L14.0348 7.64318L12.8565 6.46484L10.4998 8.82151L8.14318 6.46484L6.96484 7.64318L9.32151 9.99984L6.96484 12.3565L8.14318 13.5348Z" fill="black" fill-opacity="0.4"/>
                            <path d="M10.4993 18.3337C15.0943 18.3337 18.8327 14.5953 18.8327 10.0003C18.8327 5.40533 15.0943 1.66699 10.4993 1.66699C5.90435 1.66699 2.16602 5.40533 2.16602 10.0003C2.16602 14.5953 5.90435 18.3337 10.4993 18.3337ZM10.4993 3.33366C14.1752 3.33366 17.166 6.32449 17.166 10.0003C17.166 13.6762 14.1752 16.667 10.4993 16.667C6.82352 16.667 3.83268 13.6762 3.83268 10.0003C3.83268 6.32449 6.82352 3.33366 10.4993 3.33366Z" fill="black" fill-opacity="0.4"/>
                        </svg>
                    </div>
                </div>
                <div class="modal-content">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button
                        class="btn-outline"
                        @click="$emit('close')"  
                    >
                        Отмена
                    </button>
                    <button
                        v-if="btnNext"
                        class="btn-outline"
                        @click="$emit('success')"  
                    >
                        Пропустить этот шаг
                    </button>
                    <button 
                        v-if="btnDanger"
                        class="btn-blue btn-red"
                        @click="$emit('success')"
                    >
                        Удалить
                    </button>
                    <button 
                        v-else 
                        class="btn-blue"
                        @click="$emit('success')"
                    >
                        {{ btnConfirmTitle }}
                    </button>
                </div>
            </div>
        </div>
    </fade-transition>
</template>

<script>
import {FadeTransition} from 'vue2-transitions'

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        btnConfirmTitle: {
            type: String,
            default: ''
        },
        btnDanger: {
            type: Boolean,
            default: false
        },
        btnNext: {
            type: Boolean,
            default: false
        },
        width: {
            default: 420
        }
    },
    components: {
        FadeTransition
    }
}
</script>

<style lang="scss">
    .btn-blue.btn-red {
        background: #E54247
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        z-index: 50;
    }

    .modal-body {
        background: #FFFFFF;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        z-index: 5000;
    }

    .modal-header {
        padding: 24px;
        position: relative;
        border-bottom: 1px solid #D9D9D9;
    }

    .modal-header__title {
        font-weight: 300;
        font-size: 1.8rem;
        line-height: 2.2rem;
        color: rgba(0, 0, 0, 0.9);
    }

    .modal-btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .modal-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: rgba(0, 0, 0, 0.9);
    }

    .modal-footer {
        padding: 24px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        border-top: 1px solid #D9D9D9;

        & > button {
            width: auto;
            height: 36px;
            padding: 7px 40px;
        }
    }
</style>