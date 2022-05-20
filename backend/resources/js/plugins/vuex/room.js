const store = {
    state: ()=>({
        // activeRooms: [],
        currentRoom: null,
    }),
    getters: {
        isEntered(state){
            return !!state.currentRoom;
        }
    },
    mutations: {
        // setActiveRooms(state,rooms){
        //     state.activeRooms = rooms;
        // },
        setCurrentRoom(state,room){
            state.currentRoom = room;
        }
    },
    actions: {
        // getActiveRooms(context){
        //     return axios.get('room');
        // }
    },
    namespaced: true,
}

export default store;
