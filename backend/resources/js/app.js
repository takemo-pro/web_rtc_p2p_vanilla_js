require('./bootstrap');

import Vue from "vue";
import vuetify from "./plugins/vuetify";
import store from "./plugins/vuex";
import router from "./plugins/router";
import App from "./components/App";
import Toast from "vue-toasted";
import Helpers from "./plugins/helpers";

Vue.use(Toast,{
    theme: "toasted-primary",
    position: "top-right",
    duration : 3500,
    iconPack : 'material',
    keepOnHover: true,
});
Vue.use(Helpers);

//awaitさせるまでもないかなーっと

const app = new Vue({
    el: "div#app",
    components: {App},
    template: "<App/>",
    store,
    router,
    vuetify,
    async beforeCreate() {
        await window.axios.get('sanctum/csrf-cookie');
        await this.$store.dispatch('auth/currentUser');
    }
});


// import Connection from "./sample/Connection";
// import Room from "./sample/Room";
// import User from "./sample/User";
//
// // const startButton = document.getElementById('start_video_btn');
// // const stopButton = document.getElementById('stop_video_btn');
// const connectBtn = document.getElementById('connect_btn');
// const hangupBtn = document.getElementById('hangup_btn');
//
// const localMediaElement = document.getElementById('local_media');
// const remoteMediaElement = document.getElementById('remote_media');
//
// const selfUser = new User(utils.generateUUID());
//
// connectBtn.addEventListener('click',async function(event){
//     await selfUser.startLocalMedia(localMediaElement);
//     selfUser.makeOffer();
// });
//
// hangupBtn.addEventListener('click',e=>{
//     selfUser.stopMedia();
// });
//
// window.Echo.channel(`Rooms`)
//     .listen('ReceivedSdpMessage', event => {
//         event.sdp.sdp += "\n";
//         const sdp = new RTCSessionDescription(event.sdp);
//         selfUser.receiveSdp(sdp,event.user_id);
//     });

