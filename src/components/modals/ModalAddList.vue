<template>
    <modal
        title="Добавление списка"
        :btnConfirmTitle="compModalAddTitle"
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
                Описание
            </div>
            <textarea placeholder="Введите описание (опционально)" v-model="new_list.description"></textarea>
        </div>
        <div class="modal-item" v-show="showModalAdd2">
            <div class="modal-item__label">
                Позиции (можно добавить позже)
            </div>
            <input type="text" placeholder="Введите позиции" v-model="new_list.position">
        </div>
        <div class="modal-item" v-show="showModalAdd2">
            <div class="modal-item__label">
                Ручной ввод позиций
            </div>
            <textarea 
                placeholder="Введите название позиции" 
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
    props: ['show'],
    data() {
        return {
            showModalAdd: false,
            showModalAdd2: false,
            new_list: {
                title: '',
                description: '',
                position: '',
                position_manual: '',
                select_type_model: null
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
            this.showModalAdd = true
        },
        addList() {
            if (!this.showModalAdd2) {
                this.showModalAdd2 = true
            } else {
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
                    pos: 0
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
        compModalAddTitle() {
            return this.showModalAdd2 ? 'Добавить' : 'Далее'
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
        & > input {
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