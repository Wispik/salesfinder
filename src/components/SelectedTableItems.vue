<template>
    <div>
        <fade-transition>
            <div class="items-popup">
                <div class="items-popup__text">
                    Выбрано {{ compText }}
                </div>
                <button 
                    class="btn btn-outline"
                    @click="showModalAddToList=true"
                    v-if="!deleteButton"
                >
                    <img :src="require(`@/assets/images/icons/save.svg`)">
                    Добавить в список
                </button>
                <button 
                    class="btn btn-outline"
                    @click="deleteFromList"    
                    v-if="deleteButton"
                >
                    <img :src="require(`@/assets/images/icons/trash.svg`)">
                    Убрать из списка
                </button>
                <button class="btn btn-table-popup" @click="deselectAll">
                    Снять выбор
                </button>
            </div>
        </fade-transition>
        <modal
            title="Добавить в список"
            btnConfirmTitle="Добавить"
            v-if="showModalAddToList && !showModalCreateList"
            @close="showModalAddToList=false"
            @success="addToList"
        >
            <div class="modal-list-text" v-if="lists.length == 0">
                Вы пока не создали ни одного списка
            </div>
            <div 
                class="modal-list-item"
                :class="{'modal-list-item-selected': list.selected}"
                v-for="list in lists"
                :key="list.id"
                @click="selectList(list.id)"   
            >
                {{ list.title }}
                <svg v-if="list.selected" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.33264 11.781L1.94197 7.3903L0.0566406 9.27563L6.33264 15.5516L19.2753 2.60897L17.39 0.723633L6.33264 11.781Z" fill="#316D92"/>
                </svg>
            </div>
            <div 
                class="modal-list-item modal-list-item-btn-new"
                @click="showModalCreateList=true"
            >
                <img :src="require(`@/assets/images/icons/plus.svg`)">
                Новый список
            </div>
        </modal>   
        <modal-add-list
            :show="showModalCreateList"
            @close="showModalCreateList=false"
        />    
    </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import Modal from '@/components/modals/Modal.vue';
import ModalAddList from '@/components/modals/ModalAddList.vue';
import { mapGetters } from 'vuex'

export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        deleteButton: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModalAddToList: false,
            showModalCreateList: false,
            lists: []
        }
    },
    mounted() {
        this.updateLists()
    },
    computed: {
        ...mapGetters(['USER_LISTS']),
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
        },
        addToList() {
            console.log('add')
            this.showModalAddToList = false
        },
        selectList(id) {
            this.lists.forEach(item => {
                if (item.id == id) {
                    item.selected = true
                } else {
                    item.selected = false
                }
            })
        },
        updateLists() {
            this.lists = this.USER_LISTS.map(
            item => ({
                id: item.id,
                title: `${item.title} (0 позиций)`,
                selected: false
            })
            )
        },
        deleteFromList() {
            this.$emit('delete')
        }
    },
    watch: {
        USER_LISTS() {
            this.updateLists()
        }
    },
    components: {
        FadeTransition,
        Modal,
        ModalAddList
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

    .modal-list-item {
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        padding: 16px 12px;
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
    }

    .modal-list-item.modal-list-item-selected {
        border: 2px solid #316D92;
        color: rgba(0, 0, 0, 0.9);
    }

    .modal-list-item.modal-list-item-btn-new {
        justify-content: center;
        border: 1px dashed #D9D9D9
    }
</style>