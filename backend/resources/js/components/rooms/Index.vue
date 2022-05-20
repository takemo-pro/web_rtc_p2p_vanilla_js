<template>

    <v-card
        class="mx-auto"
        max-width="55rem"
    >
        <v-list two-line>
            <v-list-item-group>
                <template v-for="(room, index) in activeRooms">
                    <v-list-item :key="room.name">
                        <template v-slot:default="{ active }">
                            <v-list-item-content>
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
</template>

<script>
export default {
    name: "Index",
    async created() {
        this.$store.commit('global/setLoading',true);
        await window.axios.get('room').then(res=>{
            this.activeRooms = res.data.data;
        }).catch(err=>{
            this.$toasted.error(
                this.$helpers.getErrorMsg(err,'チャットルームの取得に失敗しました')
            );
        }).finally(()=>{
            this.$store.commit('global/setLoading',false);
        });
    },
    data: ()=>({
        activeRooms: [],
    }),
}
</script>

<style scoped>

</style>
