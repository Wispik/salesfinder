<template>
    <aside class="sidebar">
        <router-link 
            class="sidebar__logo"    
            to='/'
            active-class=''
        >
            <img :src="require(`@/assets/images/logo.svg`)" alt="Logo">
        </router-link>
        <ul class="sidebar__ul">
            <router-link
                v-for="item in menu"
                :key="item.id"
                :to="item.route"
                class="sidebar__li"
                :class="{'sidebar__li-big': item.icon}"
                tag="li"
                exact
            >
                <img :src="require(`@/assets/images/sidebar/${item.icon}`)" v-if="item.icon">
                {{ item.title }}
            </router-link>
        </ul>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            menu: 
                [
                    {
                        id: 0,
                        icon: 'wb.svg',
                        title: 'Wildberries',
                        route: '/wb/'
                    },
                    {
                        id: 1,
                        icon: '',
                        title: 'Категории',
                        route: '/wb/category/'
                    },
                    {
                        id: 2,
                        icon: '',
                        title: 'Товары',
                        route: '/wb/products/'
                    },
                    {
                        id: 3,
                        icon: '',
                        title: 'Бренды',
                        route: '/wb/brands/'
                    },
                    {
                        id: 4,
                        icon: '',
                        title: 'Продавцы',
                        route: '/wb/sellers/'
                    },
                    {
                        id: 5,
                        icon: '',
                        title: 'Рейтинги',
                        route: '/wb/ratings/'
                    },
                    {
                        id: 6,
                        icon: 'ozon.svg',
                        title: 'OZON',
                        route: '/ozon/'
                    },
                    {
                        id: 7,
                        icon: '',
                        title: 'Категории',
                        route: '/ozon/category/'
                    },
                    {
                        id: 8,
                        icon: '',
                        title: 'Товары',
                        route: '/ozon/products/'
                    },
                    {
                        id: 9,
                        icon: '',
                        title: 'Бренды',
                        route: '/ozon/brands/'
                    },
                    {
                        id: 10,
                        icon: '',
                        title: 'Продавцы',
                        route: '/ozon/sellers/'
                    },
                    {
                        id: 11,
                        icon: '',
                        title: 'Рейтинги',
                        route: '/ozon/ratings/'
                    },
                    {
                        id: 12,
                        icon: 'compare.svg',
                        title: 'Сравнение',
                        route: '/'
                    },
                    {
                        id: 13,
                        icon: 'lists.svg',
                        title: 'Мои списки',
                        route: '/'
                    },
                    {
                        id: 14,
                        icon: 'about.svg',
                        title: 'О сервисе',
                        route: '/'
                    },
                    {
                        id: 15,
                        icon: '',
                        title: 'Возможности',
                        route: '/'
                    },
                    {
                        id: 16,
                        icon: '',
                        title: 'Тарифы',
                        route: '/'
                    },
                    {
                        id: 17,
                        icon: '',
                        title: 'Контакты',
                        route: '/'
                    },
                ]
        }
    }
}
</script>

<style lang="scss">
    .sidebar {
        width: 200px;
        background: #354052;
        display: flex;
        flex-direction: column;
    }

    .sidebar__logo {
        height: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #434E60;
    }

    .sidebar__ul {
        font-size: 1.4rem;
        color: #FFFFFF;
    }

    .sidebar__li {
        padding: 7px 20px;
        font-weight: 500;
        cursor: pointer;
    }

    .sidebar__li:hover {
        background: #283140;
    }

    .sidebar__li-big {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        font-family: 'PT Sans';
        font-weight: 800;
        font-size: 1.8rem;

        position: relative;
        height: 57px;

        & > img {
            margin-right: 8px;
        }
    }

    .sidebar__li-big::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #434E60;
        top: 7px;
        left: 0;
    }

    .sidebar__li-big:first-child {
        height: 52px;
    }

    .sidebar__li-big:first-child::before {
        display: none;
    }

    .router-link-active {
        background: #283140;
        position: relative;
    }

    .router-link-active::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 6px;
        background: #C61B19;
        top: 0;
        left: 0;
    }
</style>