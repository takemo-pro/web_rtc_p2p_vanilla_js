const store = {
    state: ()=>({
        activeRooms: [],
        currentRoom: null,
    }),
    getters: {
        isEntered(state){
            return !!state.currentRoom;
        }
    },
    mutations: {
        setActiveRooms(state,rooms){
            state.activeRooms = rooms;
        },
        setCurrentRoom(state,room){
            state.currentRoom = room;
        }
    },
    actions: {
        async createMyRoom(context,data){
            await axios.post('room',data).then(res => {
                context.commit('setCurrentRoom',res.data.data);
            });
            await axios.get('room').then(res => {
                context.commit('setActiveRooms',res.data.data);
            });
        },
        async getActiveRooms(context){
            await axios.get('room').then(res => {
                context.commit('setActiveRooms',res.data.data);
            });
        }
    },
    namespaced: true,
}

export default store;
