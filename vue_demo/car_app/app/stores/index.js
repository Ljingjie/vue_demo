import createLogger from 'vuex/dist/logger'

import routerStore from './routerStore'
import carInfoStore from './carInfoStore'
import carlistStore from './carlistStore'
import compareStore from './compareStore'
import saleStore from './saleStore'
import meStore from './meStore'

export default{
    modules: {
        routerStore,
        carInfoStore,
        carlistStore,
        compareStore,
        saleStore,
        meStore
    },
     plugins: [createLogger()]
}