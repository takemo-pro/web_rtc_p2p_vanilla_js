<template>
    <div>
        <Create
            class="my-16"
        >
        </Create>
        <v-card
            class="mx-auto mb-5"
            max-width="55rem"
            v-if="currentRoom"
        >
            <v-card-title>
                現在入室中の部屋 : {{currentRoom.name}}
            </v-card-title>
        </v-card>

        <v-card
            class="mx-auto"
            max-width="55rem"
        >
            <v-list two-line>
                <v-list-item-group>
                    <template v-for="(room, index) in activeRooms">
                        <v-list-item :key="room.id">
                            <template v-slot:default="{ active }">
                                <v-list-item-content
                                    @click="join"
                                >
                                    <v-list-item-title v-text="room.name"></v-list-item-title>

                                    <v-list-item-subtitle
                                        class="text--primary"
                                        v-text="'最大入室人数 : ' + room.max_user_count"
                                    ></v-list-item-subtitle>

                                </v-list-item-content>
                            </template>
                        </v-list-item>

                        <v-divider
                            v-if="index < activeRooms.length - 1"
                            :key="index"
                        ></v-divider>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import Create from "./Create";
export default {
    name: "Index",
    components: {
        Create,
    },
    async created() {
        this.$store.commit('global/setLoading',true);
        await this.$store.dispatch('room/getActiveRooms');

        this.$store.commit('global/setLoading',false);
    },
    computed: {
        activeRooms(){
            return this.$store.state.room.activeRooms;
        },
        currentRoom(){
            return this.$store.state.room.currentRoom;
        }
    },
    methods: {
        join(){

        }
    },
}
</script>

<style scoped>

</style>
