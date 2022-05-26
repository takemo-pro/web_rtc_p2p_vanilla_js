require('./bootstrap');

import config from "./Room/config";
import Room from "./Room/Room";
import User from "./Room/User";
import Me from "./Room/Me";
import Peer from "./Room/Peer";


/** @var {HTMLInputElement} roomIdInput */
const roomIdInput = document.getElementById('room_id');
/** @var {HTMLInputElement} roomNameInput */
const roomNameInput = document.getElementById('room_name');

const userNameInput = document.getElementById('user_name');
/** @var {HTMLInputElement} roomIdInput */
const userIdInput = document.getElementById('user_id');
/** @var {HTMLMediaElement} */
const localMediaDom = document.getElementById('local_media');

const createRoomBtn = document.getElementById('create_room_btn');
const joinRoomBtn = document.getElementById('join_room_btn');
const leaveRoomBtn = document.getElementById('leave_room_btn');

let currentRoom;

const getUserMedia = function(){
    return navigator.mediaDevices.getUserMedia(config.mediaType);
}

const setLocalMedia = function(stream){
    localMediaDom.srcObject = stream;
    localMediaDom.muted = true;
    localMediaDom.play().catch(err=>{
        alert('ローカルメディアの再生に失敗しました');
        console.error(err);
    });
}

createRoomBtn.addEventListener('click',async evt=>{
    if(roomNameInput.value.length <= 0){
        alert('部屋名を入力してください');
        return;
    }
    const localMedia = await getUserMedia();
    setLocalMedia(localMedia);
    if(currentRoom instanceof Room) return;
    // me = new User(userIdInput.value);
    const createRoomResponse = Room.create(roomNameInput.value,localMedia);
    createRoomResponse.then(room => {
        currentRoom = room;
        document.getElementById('room_info').innerText = currentRoom.id;
    });
});

joinRoomBtn.addEventListener('click',async evt=>{
    if(roomIdInput.value.length <= 0){
        alert('部屋IDを入力してください');
        return;
    }
    const localMedia = await getUserMedia();
    setLocalMedia(localMedia);
    if(currentRoom instanceof Room) return;
    const joinRoomResponse = Room.join(roomIdInput.value,localMedia);
    joinRoomResponse.then(room => {
        currentRoom = room;
        document.getElementById('room_info').innerText = currentRoom.id;
    });
});

// leaveRoomBtn.addEventListener('click',evt=>{
//     //todo: disconnect
// });
