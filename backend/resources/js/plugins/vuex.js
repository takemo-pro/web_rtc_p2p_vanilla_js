import Vue from 'vue'
import Vuex from 'vuex'

import authStore from "./vuex/auth";
import globalStore from "./vuex/global";
import roomStore from "./vuex/room";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: authStore,
        global: globalStore,
        room: roomStore,
    }
})

export default store;
