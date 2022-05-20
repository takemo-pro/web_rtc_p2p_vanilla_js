const store = {
    state: ()=>({
        isLoading: false,
    }),
    getters: {

    },
    mutations: {
        setLoading(state,isLoading){
            state.isLoading = isLoading;
        }
    },
    actions: {
    },
    namespaced: true,
}

export default store;
