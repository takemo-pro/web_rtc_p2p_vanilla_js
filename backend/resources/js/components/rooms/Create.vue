<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            max-width="50rem"
        >
            <template v-slot:activator="{on,attrs}">
                <v-btn
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-shape-square-plus</v-icon>
                    新規ルーム作成
                </v-btn>
            </template>
            <v-card
                :loading="loader"
            >
                <v-card-title>
                    <span class="text-h5">新規ルーム作成</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="createRoomValid">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="ルーム名*"
                                        required
                                        placeholder="雑談部屋"
                                        v-model="roomName"
                                        :rules="roomNameRules"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                    <small>*必須項目です</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green lighten-1"
                        dark
                        @click.prevent="createRoom"
                    >
                        作成
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "Create",
    data: ()=>({
        createRoomValid: false,
        roomName: '',
        roomNameRules: [
            v => !!v || "ルーム名は必須です",
            v => !!v.length <= 30 || "ルーム名は30文字以内で入力してください",
        ],
        dialog: false,
        loader: false,
    }),
    methods: {
        createRoom(){
            if(this.$refs.form.validate()){
                this.loader = true;
                this.$store.dispatch('room/createMyRoom',{
                    name: this.roomName,
                    user_id: this.$store.state.auth.user.id,
                }).then(()=>{
                    this.$toasted.success('ルームを作成しました');
                }).catch(err=>{
                    this.$toasted.error(this.$helpers.getErrorMsg(err,'ルームの作成に失敗しました'));
                }).finally(()=>{
                    this.loader = false;
                    this.dialog = false;
                });
            }
        },
    },
}
</script>

<style scoped>

</style>
