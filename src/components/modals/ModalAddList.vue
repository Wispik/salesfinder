<template>
    <modal
        :title="compModalAddTitle"
        :btnConfirmTitle="compModalAddButtonTitle"
        :btnNext="!updated && showModalAdd2"
        :width="!updated && showModalAdd2 ? 600 : 420"
        v-if="showModalAdd"
        @close="closeModalAddFunc"
        @success="addList"
    >
        <div class="modal-item" v-show="!showModalAdd2">
            <div class="modal-item__label">
                Название
            </div>
            <input type="text" placeholder="Название списка" v-model="new_list.title">
        </div>
        <div class="modal-item" v-show="!showModalAdd2">
            <div class="modal-item__label">
                Тип списка
            </div>
            <app-select 
                :items="select_type_items"
                v-model="new_list.select_type_model"
                fullwidth
            />
        </div>
        <div class="modal-item" v-show="!showModalAdd2">
            <div class="modal-item__label">
                Маркетплейс
            </div>
            <app-select 
                :items="select_marketplace_items"
                v-model="new_list.select_marketplace_model"
                fullwidth
            />
        </div>
        <div class="modal-item" v-show="!showModalAdd2">
            <div class="modal-item__label">
                Описание
            </div>
            <textarea placeholder="Введите описание (опционально)" v-model="new_list.description"></textarea>
        </div>
        <div class="modal-item" v-show="showModalAdd2">
            <div class="modal-item__label">
                Добавить через поиск
            </div>
            <div class="modal-item__search-input">
                <input type="text" :placeholder="compPlaceholderSearchInput" v-model="new_list.position">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.27001 14.5392C8.94756 14.5392 10.4897 13.9622 11.7202 13.0053L15.715 17L17 15.7151L13.0051 11.7204C13.963 10.4891 14.54 8.94708 14.54 7.26962C14.54 3.26133 11.2785 0 7.27001 0C3.26151 0 0 3.26133 0 7.26962C0 11.2779 3.26151 14.5392 7.27001 14.5392ZM7.27001 1.8174C10.2771 1.8174 12.7225 4.26272 12.7225 7.26962C12.7225 10.2765 10.2771 12.7218 7.27001 12.7218C4.26295 12.7218 1.8175 10.2765 1.8175 7.26962C1.8175 4.26272 4.26295 1.8174 7.27001 1.8174Z" fill="black" fill-opacity="0.9"/>
                </svg>
            </div>
        </div>
        <div class="modal-item" v-show="showModalAdd2">
            <div class="modal-item__label">
                {{ compTitleSearchTextArea }}
            </div>
            <textarea 
                :placeholder="compPlaceholderSearchTextArea" 
                v-model="new_list.position_manual"
                style="height: 170px"  
            ></textarea>
        </div>
    </modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '@/components/modals/Modal.vue';
import AppSelect from '@/components/AppSelect.vue';

export default {
    props: {
        show: {
            required: true
        },
        updated: {
            default: false
        },
        id: {
            required: false
        }
    },
    data() {
        return {
            showModalAdd: false,
            showModalAdd2: false,
            new_list: {
                title: '',
                description: '',
                position: '',
                position_manual: '',
                select_type_model: null,
                select_marketplace_model: null
            },
            select_type_items: [
                {
                    id: 0,
                    title: 'Не выбрано',
                    color: "rgba(51, 51, 51, 0.25)"
                },
                {
                    id: 1,
                    title: 'Категории' 
                },
                {
                    id: 2,
                    title: 'Товары' 
                },
                {
                    id: 3,
                    title: 'Бренды' 
                },
                {
                    id: 4,
                    title: 'Продавцы' 
                }
            ],
            select_marketplace_items: [
                {
                    id: 0,
                    title: 'Не выбрано',
                    color: "rgba(51, 51, 51, 0.25)"
                },
                {
                    id: 1,
                    title: 'Wildberries' 
                },
                {
                    id: 2,
                    title: 'OZON' 
                }
            ]
        }
    },
    methods: {
        ...mapMutations(
            ['ADD_TO_USER_LISTS']
        ),
        showModalListFunc() {
            this.new_list.title = ''
            this.new_list.description = ''
            this.new_list.position = ''
            this.new_list.position_manual = ''
            this.new_list.select_type_model = this.select_type_items[0]
            this.new_list.select_marketplace_model = this.select_marketplace_items[0]
            this.showModalAdd = true
            if (this.updated) {
                let list = this.list = this.USER_LISTS.find(item => item.id == this.id)
                this.new_list.select_type_model = this.select_type_items.find(item => item.title == list.type)
                this.showModalAdd2 = true
            }
        },
        addList() {
            if (!this.showModalAdd2) {
                this.showModalAdd2 = true
            } else {
                if (this.updated) {
                    this.closeModalAddFunc()
                    return
                }
                let today = new Date()
                let index = this.USER_LISTS.length == 0 ? 1 : this.USER_LISTS[this.USER_LISTS.length-1].id + 1
                this.ADD_TO_USER_LISTS({
                    id: index,
                    title: this.new_list.title,
                    description: this.new_list.description,
                    position: this.new_list.position,
                    position_manual: this.new_list.position_manual,
                    type: this.new_list.select_type_model.title,
                    date: today.toLocaleDateString("ru-RU").replaceAll('.','-'),
                    pos: 0,
                    marketplace: this.new_list.select_marketplace_model.title
                })
                this.closeModalAddFunc()
            }
        },
        closeModalAddFunc() {
            this.showModalAdd = false
            this.showModalAdd2 = false
            this.$emit('close')
        },
    },
    computed: {
        ...mapGetters(['USER_LISTS']),
        compModalAddButtonTitle() {
            return this.showModalAdd2 ? 'Добавить' : 'Далее'
        },
        compModalAddTitle() {
            if (!this.showModalAdd2) {
                return 'Создание списка'
            } else {
                let res = 'Добавление ' + this.new_list.select_type_model.title.toLowerCase()
                if (this.new_list.select_type_model.id == 1) {
                    res = res.substr(0, res.length - 1) + 'й'
                } else {
                    res = res.substr(0, res.length - 1) + 'ов'
                }
                return res
            }
        },
        compPlaceholderSearchInput() {
            let s = this.new_list.select_type_model.title.toLowerCase()
            if (this.new_list.select_type_model.id == 1) {
                s = s.substr(0, s.length - 1) + 'ям'
            } else {
                s = s.substr(0, s.length - 1) + 'ам'
            }
            return `Поиск по ${s}`
        },
        compTitleSearchTextArea() {
            let s = this.new_list.select_type_model.title.toLowerCase()
            if (this.new_list.select_type_model.id == 1) {
                s = s.substr(0, s.length - 1) + 'й'
            } else {
                s = s.substr(0, s.length - 1) + 'ов'
            }
            return `Введите список ${s} (можно добавить позже)`
        },
        compPlaceholderSearchTextArea() {
            let s = this.new_list.select_type_model.title.toLowerCase()
            if (this.new_list.select_type_model.id == 1) {
                s = s.substr(0, s.length - 1) + 'й'
            } else {
                s = s.substr(0, s.length - 1) + 'ов'
            }
            return `Введите список (для товаров “список SKU”) ${s} по одному в строке. Либо воспользуйтесь формой поиска`
        }
    },
    watch: {
        show(newVal) {
            if (newVal) {
                this.showModalListFunc()
            }
        }
    },
    components: {
        Modal,
        AppSelect
    }
}
</script>

<style lang="scss" scoped>
    .modal-item {
        & > input, & > .modal-item__search-input > input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            color: rgba(0, 0, 0, 0.9);
            font-size: 1.4rem;
            transition: 0.4s;

            &::placeholder {
                color: rgba(51, 51, 51, 0.25);
            }

            &:focus {
                border: 1px solid #316D92;
            }
        }

        & > .modal-item__search-input {
            position: relative;

            & > input {
                padding-right: 40px;
            }

            & > svg {
                position: absolute;
                top: 9px;
                right: 14px;
            }
        }

        & > textarea {
            width: 100%;
            height: 100px;
            font-family: Ubuntu;
            font-style: normal;
            font-weight: 500;
            font-size: 1.4rem;
            line-height: 2.2rem;
            padding: 8px 12px;
            color: rgba(0, 0, 0, 0.9);
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            transition: 0.4s;
            resize: none;

            &::placeholder {
                color: rgba(51, 51, 51, 0.25);
            }

            &:focus {
                border: 1px solid #316D92;
                outline: none;
            }
        }
    }

    .modal-item__label {
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 1.6rem;
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.9);
    }
</style>