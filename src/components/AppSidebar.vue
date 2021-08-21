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
            <li
                v-for="item in menu"
                :key="item.id"
                class="sidebar__li"
                :class="{'sidebar__li-big': item.icon}"
            >
                <router-link
                    v-if="item.route"
                    :to=item.route
                    class="sidebar__li-item sidebar__li-item-link"
                    tag="div"
                    
                >
                    <img :src="require(`@/assets/images/sidebar/${item.icon}`)" v-if="item.icon">
                    <span>
                        {{ item.title }}
                    </span>
                </router-link>
                <div 
                    v-else
                    class="sidebar__li-item"
                >
                    <img :src="require(`@/assets/images/sidebar/${item.icon}`)" v-if="item.icon">
                    <span>
                        {{ item.title }}
                    </span>
                </div>
            </li>
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
                        route: ''
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
                        route: ''
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
                        route: ''
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
        font-weight: 500;
    }

    .sidebar__li-line {
        width: 100%;
        height: 1px;
        background: #434E60;
    }

    .sidebar__li-item {
        padding: 7px 20px;
    }

    .sidebar__li-item.sidebar__li-item-link {
        cursor: pointer;
    }

    .sidebar__li-item.sidebar__li-item-link:hover {
        background: darken(#354052, 3%);
    }

    .sidebar__li-big > .sidebar__li-item {
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

    .sidebar__li-big > .sidebar__li-item::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 14px;
        background: #354052;
        top: 0px;
        left: 0;
    }

    .sidebar__li-big > .sidebar__li-item::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #434E60;
        top: 7px;
        left: 0;
    }

    .sidebar__li-big:first-child > .sidebar__li-item {
        height: 52px;
    }

    .sidebar__li-big:first-child > .sidebar__li-item::before,
    .sidebar__li-big:first-child > .sidebar__li-item::after {
        display: none;
    }

    .sidebar__li-big > .sidebar__li-item > span {
        height: 28px;
        display: flex;
        align-items: center;
    }

    .router-link-active {
        background: #283140 ;
        position: relative;
    }

    .router-link-active:hover {
        background: #283140 ;
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