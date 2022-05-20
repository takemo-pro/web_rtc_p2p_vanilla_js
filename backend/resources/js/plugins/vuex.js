import Vue from 'vue'
import Vuex from 'vuex'

import authStore from "./vuex/auth";
import globalStore from "./vuex/global";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: authStore,
        global: globalStore,
    }
})

export default store;
