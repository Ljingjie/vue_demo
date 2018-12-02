import Avatar from './Avatar.vue'
import BuyDate from './BuyDate.vue'
import KM from './KM.vue'
import License from './License.vue'
export default [
        {
            title: '图片',
            key: 'avatar',
            render(h, {row}){
                return h(Avatar, {
                    props : {
                        row
                    }
                })
            }
        },
        {
            title: 'id',
            key: 'id',
            sortable: 'custom',
            sortType : 'asc'
        },
        {
            title: '颜色',
            key: 'color'
        },
        {
            title: '品牌',
            key: 'brand'
        },
        {
            title: '车系',
            key: 'series'
        },
        {
            title: '售价',
            key: 'price',
            sortable: 'custom'
        },
        {
            title: '公里数',
            key: 'km',
            render(h, {row}){
                return h(KM, {
                    props : {
                        row
                    }
                })
            },
            sortable: 'custom'
        },
        {
            title: '购买日期',
            key: 'buydate',
            render(h, {row}){
                return h(BuyDate, {
                    props : {
                        "buydate" : row.buydate
                    }
                })
            },
            sortable: 'custom'
        },
        {
            title: '发动机',
            key: 'engine'
        },
        {
            title: '燃料',
            key: 'fuel'
        },
        {
            title: '排放',
            key: 'exhaust'
        },
        {
            title: '变速箱',
            key: 'gearbox'
        },
        {
            title: '是否上牌',
            key: 'license',
            render (h, {row}){
                return h(License, {
                    props : {
                        row
                    }
                })
            }
        }
]