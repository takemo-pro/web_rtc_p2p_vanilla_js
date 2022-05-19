require('./bootstrap');
import Connection from "./sample/Connection";
import Room from "./sample/Room";
import User from "./sample/User";

// const startButton = document.getElementById('start_video_btn');
// const stopButton = document.getElementById('stop_video_btn');
const connectBtn = document.getElementById('connect_btn');
const hangupBtn = document.getElementById('hangup_btn');

const localMediaElement = document.getElementById('local_media');
const remoteMediaElement = document.getElementById('remote_media');

const selfUser = new User(utils.generateUUID());

connectBtn.addEventListener('click',async function(event){
    await selfUser.startLocalMedia(localMediaElement);
    selfUser.makeOffer();
});

hangupBtn.addEventListener('click',e=>{
    selfUser.stopMedia();
});

window.Echo.channel(`Rooms`)
    .listen('ReceivedSdpMessage', event => {
        event.sdp.sdp += "\n";
        const sdp = new RTCSessionDescription(event.sdp);
        selfUser.receiveSdp(sdp,event.user_id);
    });

