<template>
  <vue-custom-scrollbar class="treeview" :settings="scrollSettings">
            <div class="treeview-item">
                <checkbox v-model="items.checked" :title="items.title" @change="selectItem(items)" rounded/>
                <img 
                    :src="require(`@/assets/images/icons/treeview_arrow.svg`)" 
                    v-if="items.child.length > 0"
                    @click.stop="items.show = !items.show"
                    :class="{'treeview-item__close': !items.show}"    
                >
            </div>
            <template
                v-for="i in items.child"
            >
                <div class="treeview-item treeview-item-2" :key="items.id + i.title" v-if="items.show">
                    <checkbox v-model="i.checked" :title="i.title" @change="selectItem(i)" rounded/>
                    <img 
                        :src="require(`@/assets/images/icons/treeview_arrow.svg`)" 
                        v-if="i.child.length > 0"
                        @click.stop="i.show = !i.show"
                        :class="{'treeview-item__close': !i.show}"    
                    >
                </div>
                    <div 
                        class="treeview-item treeview-item-3" 
                        v-for="i2 in i.child"
                        :key="items.id + i2.title"
                        v-show="i.show & items.show"
                    >
                        <checkbox v-model="i2.checked" :title="i2.title" rounded/>
                        <img 
                            :src="require(`@/assets/images/icons/treeview_arrow.svg`)" 
                            v-if="i2.child.length > 0"
                            @click.stop="i2.show = !i2.show"
                            :class="{'treeview-item__close': !i2.show}"    
                        >
                    </div>
            </template>
        </vue-custom-scrollbar>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue'

export default {
    props: ['items'],
    data() {
        return {
            scrollSettings: {
                suppressScrollX: true,
                suppressScrollY: false,
                wheelPropagation: false
            }
        }
    },
    components: {
        Checkbox
    },
    methods: {
        selectItem(item) {
            item.child.forEach(el => {
                el.checked = item.checked
                el.child.forEach(e => {
                    e.checked = el.checked
                })
            });
        }
    }
}
</script>

<style lang="scss">
    .treeview {
        padding: 12px 16px;
        height: 100%;
        position: relative;
    }

    .treeview-item {
        padding: 4px 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .treeview-item > img {
        margin-left: 8px;
        transition: .4s;
    }

    .treeview-item__close {
        transform: rotateZ(180deg);
    }

    .treeview-item-2 {
        padding-left: 16px;
    }

    .treeview-item-3 {
        padding-left: 32px;
    }

    .treeview-scrollbar {
        height: 100%;
        position: relative;
        width: 200px;
        height: 400px;
    }
</style>