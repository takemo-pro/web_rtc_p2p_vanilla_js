const store = {
    state: ()=>({
        user: null
    }),
    getters: {
        isLoggedIn(state){
            return !!state.user;
        }
    },
    mutations: {
        setUser(state,user){
            state.user = user;
        }
    },
    actions: {
        register(context,data){
            return window.axios.post('register',data);
        },
        currentUser(context){
            window.axios.get('me').then(res=>{
                context.commit('setUser',res.data.data);
            });
        },
        async login(context,data){
            await window.axios.post('login',data);
            const user = await window.axios.get('me');
            context.commit('setUser',user.data.data);
        },
        async logout(context){
            if(context.getters.isLoggedIn){
                await window.axios.post('logout');
                context.commit('setUser',null);
            }
        },
    },
    namespaced: true,
}

export default store;
