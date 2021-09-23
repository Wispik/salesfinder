<template>
  <div class="lists-page">
      <div class="lists-page__none" v-if="USER_LISTS.length == 0">
          <div class="lists-page__none-title">
              Мои списки
          </div>
          <div class="lists-page__none-text">
              Здесь вы можете создать свои списки товаров, брендов, продавцов для быстрого доступа к их характеристикам. Также можно создавать списки и добавлять в него позиции прямо из таблицы отчетов
          </div>
          <button class="btn-outline btn-width-auto" @click="showModalAdd=true">
              <img :src="require(`@/assets/images/icons/plus.svg`)">
              Создать первый список
          </button>
      </div>
      <div class="lists-page__content" v-else>
          <div class="lists-page__content-title">
              <div class="main-title">
                  Мои списки
              </div>
              <button class="btn-outline btn-width-auto" @click="showModalAdd=true">
                <img :src="require(`@/assets/images/icons/plus.svg`)">
                Новый список
              </button>
          </div>
          <category-table 
              :config="actualTableData"
              :checked="false"
              disableScroll
              @editRow="showModalEditFunc"
              @deleteRow="showModalDeleteFunc"
           />
      </div>
      <modal
        title="Удаление списка"
        btnDanger
        v-if="showModalDelete"
        @close="closeModalDeleteFunc"
        @success="deleteRow"
      >
        {{ textModalDelete }}
      </modal>
      <modal
        title="Редактирование списка"
        btnConfirmTitle="Сохранить изменения"
        v-if="showModalEdit"
        @close="closeModalEditFunc"
        @success="editRow"
      >
        <div class="modal-item">
            <div class="modal-item__label">
                Название
            </div>
            <input type="text" placeholder="Название списка" v-model="editTitle">
        </div>
        <div class="modal-item">
            <div class="modal-item__label">
                Описание (опционально)
            </div>
            <textarea 
                placeholder="Описание (опционально)" 
                v-model="editDescription"
            ></textarea>
        </div>
      </modal>
      <modal-add-list
        :show="showModalAdd"
        @close="showModalAdd=false"
      />
  </div>
</template>

<script>
import Modal from '@/components/modals/Modal.vue';
import ModalAddList from '@/components/modals/ModalAddList.vue';
import CategoryTable from '@/components/CategoryTable.vue';

import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            showModalAdd: false,
            showModalDelete: false,
            showModalEdit: false,
            deletedRow: null,
            editedRow: null,
            editTitle: '',
            editDescription: '',
            table_head: [
                {
                    id: 1,
                    title: 'Название',
                    name: 'title',
                    type: 'link',
                    routeName: 'ListView',
                    position: 1,
                    show: true,
                    width: 250
                },
                {
                    id: 2,
                    title: 'Дата создания',
                    name: 'date',
                    position: 2,
                    show: true,
                    width: 140
                },
                {
                    id: 3,
                    title: 'Тип',
                    name: 'type',
                    position: 3,
                    show: true,
                    width: 120
                },
                {
                    id: 4,
                    title: 'Маркетплейс',
                    name: 'marketplace',
                    position: 4,
                    show: true,
                    width: 120
                },
                {
                    id: 5,
                    title: 'Кол-во',
                    name: 'pos',
                    position: 5,
                    show: true,
                    width: 100
                },
                {
                    id: 6,
                    title: 'Описание',
                    name: 'description',
                    position: 6,
                    show: true
                },
                {
                    id: 7,
                    title: '',
                    name: '_editrow',
                    position: 7,
                    show: true,
                    width: 60
                }
            ],
            table_config: {
                head: [],
                data: []
            }
        }
    },
    methods: {
        ...mapMutations(
            ['DELETE_FROM_USER_LISTS_BY_ID', 'EDIT_USER_LISTS_BY_ID']
        ),
        showModalEditFunc(row) {
            this.editedRow = row
            this.editTitle = row.title
            this.editDescription = row.description
            this.showModalEdit = true
        },
        closeModalEditFunc() {
            this.showModalEdit = false
            this.editedRow = null
            this.editedRow = ''
            this.editTitle = ''
        },
        showModalDeleteFunc(row) {
            this.deletedRow = row
            this.showModalDelete = true
        },
        editRow() {
            const params = {
                id: this.editedRow.id,
                title: this.editTitle,
                description: this.editDescription
            }
            this.EDIT_USER_LISTS_BY_ID(params)
            this.closeModalEditFunc()
        },
        closeModalDeleteFunc() {
            this.deletedRow = null
            this.showModalDelete = false
        },
        deleteRow() {
            this.showModalDelete = false
            this.DELETE_FROM_USER_LISTS_BY_ID(this.deletedRow.id)
            this.deletedRow = null
        }
    },
    computed: {
        ...mapGetters(['USER_LISTS']),
        actualTableData() {
            return {
                head: [...this.table_head],
                data: [...this.USER_LISTS]
            }
        },
        textModalDelete() {
            return `Вы действительно хотите удалить список "${this.deletedRow.title}"?`
        },
    },
    components: {
        Modal,
        CategoryTable,
        ModalAddList
    }
}
</script>

<style lang="scss" scoped>
    .lists-page {
        width: 100%;
        height: 100%;
        padding: 28px 24px;
    }

    .lists-page__none {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .lists-page__none-title {
        color: rgba(0, 0, 0, 0.9);
        font-weight: 300;
        font-size: 2.4rem;
        line-height: 2.8rem;
        margin-top: 200px;
    }

    .lists-page__none-text {
        width: 665px;
        margin-top: 8px;
        margin-bottom: 32px;
        font-weight: 300;
        font-size: 1.6rem;
        line-height: 2.2rem;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
    }

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

    .lists-page__content {
        display: flex;
        flex-direction: column;
    }

    .lists-page__content-title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
    }
</style>