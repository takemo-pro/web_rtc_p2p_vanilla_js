<template>
    <v-app
    >
        <div id="skeleton_loader" v-if="isLoading"/>

        <v-navigation-drawer app>
        </v-navigation-drawer>

        <v-app-bar
            app
        >
            <v-spacer/>
            <v-btn
                icon
                v-if="isLoggedIn"
                @click="logout"
            >
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-progress-linear
                :active="isLoading"
                indeterminate
                color="cyan"
                id="global_progress_bar"
                absolute
                bottom
            ></v-progress-linear>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "App",
    computed: {
        isLoading(){
            return this.$store.state.global.isLoading;
        },
        isLoggedIn(){
            return this.$store.getters["auth/isLoggedIn"];
        }
    },
    methods: {
        logout() {
            this.$store.commit('global/setLoading',true);
            this.$store.dispatch('auth/logout').then(res=>{
                this.$toasted.success('ログアウトしました');
                this.$router.push('login');
            }).catch(err=>{
                this.$toasted.error(this.$helpers.getErrorMsg(err,'ログアウトに失敗しました'));
            }).finally(()=>{
                this.$store.commit('global/setLoading',false);
            });
        },
    }
}
</script>

<style scoped>
div#skeleton_loader{
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(255,255,255,0.4);
    animation: 1s ease-in 0.5s;
}

div#global_progress_bar{
    z-index: 10000;
}

</style>
