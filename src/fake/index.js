const main_table_data = [
        {
            id: 1,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 2,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 3,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 4,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 5,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 6,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 7,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 8,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 9,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 10,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 11,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 12,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 13,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 14,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 15,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 16,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 17,
            image: 'fake1.png',
            product: 'Рубашка повседневная',
            price: '999',
            category: 'Блузки и рубашки',
            pos: 1,
            rewiews: 890,
            rating: 3,
            seller: 'BETTALEME'
        },
        {
            id: 18,
            image: 'fake2.png',
            product: 'Рубашка',
            price: '1 599.00',
            category: 'Брюки',
            pos: 2,
            rewiews: 890,
            rating: 3,
            seller: 'Dea Store'
        },
        {
            id: 19,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        },
        {
            id: 20,
            image: 'fake3.png',
            product: 'Рубашка свободная/прямая',
            price: '2 399.00',
            category: 'Верхняя одежда',
            pos: 3,
            rewiews: 890,
            rating: 3,
            seller: 'E.Y. Store'
        }
    ]

const categories = [
    {
        id: 1,
        title: 'Женщинам',
        checked: false,
        show: true,
        child: [
            {
                title: 'Одежда',
                checked: false,
                show: true,
                child: [
                    {
                        title: 'Блузки и рубашки',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Блузка',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Велосипедки',
                        checked: false,
                        show: true,
                        child: []
                    }
                ]
            },
            {
                title: 'Большие размеры',
                checked: false,
                show: true,
                child: [
                    {
                        title: 'Белье',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Бюстгальтер',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Бюстье',
                        checked: false,
                        show: true,
                        child: []
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'Бытовая техника',
        checked: false,
        show: true,
        child: [
            {
                title: 'Крупная бытовая техника',
                checked: false,
                show: true,
                child: []
            },
            {
                title: 'Варочная панель',
                checked: false,
                show: true,
                child: []
            },
            {
                title: 'Винный шкаф',
                checked: false,
                show: true,
                child: []
            },
            {
                title: 'Морозильный ларь',
                checked: false,
                show: true,
                child: []
            },
            {
                title: 'Плиты с духовкой',
                checked: false,
                show: true,
                child: []
            }
        ]
    },
    {
        id: 3,
        title: 'Для ремонта',
        checked: false,
        show: true,
        child: [
            {
                title: 'Инструменты и оснастка',
                checked: false,
                show: true,
                child: [
                    {
                        title: 'Зажимные инструменты',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Длинногубцы',
                        checked: false,
                        show: true,
                        child: []
                    },
                    {
                        title: 'Зажим для шланга',
                        checked: false,
                        show: true,
                        child: []
                    }
                ]
            }
        ]
    },
]

export { main_table_data, categories }