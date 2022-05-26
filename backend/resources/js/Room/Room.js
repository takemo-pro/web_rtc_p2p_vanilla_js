import User from "./User";
import Peer from "./Peer";
import Me from "./Me";

class Room {
    /** @var {string|int} */
    #id;
    get id(){
        return this.#id;
    }

    /** @var {string} */
    #name;
    get name(){
        return this.#name;
    }

    /** @var {Me} */
    #localUser;
    get localUser(){
        return this.#localUser;
    }

    /** @var {User} */
    #hostUser;
    get hostUser(){
        return this.#hostUser;
    }

    /** @var {Array<User>} */
    #users = [];
    get users(){
        return this.#users;
    }

    /**
     * private!!!!
     *
     * @param id
     * @param name
     * @param {User} hostUser
     * @param {Array<User>} users
     * @param {Me} localUser
     */
    constructor(id,name,hostUser,users,localUser){
        this.#id = id;
        this.#name = name;
        this.#hostUser = hostUser;
        this.#users = users;
        this.#localUser = localUser;
    }

    /**
     * 部屋作成
     *
     * @param {string} name
     * @param {MediaStream} localMediaStream
     * @returns {Promise<Room>}
     */
    static async create(name,localMediaStream){
        return await window.axios.post("room",{
            name : name,
        }).then(res=>{
            const roomId = res.data.data.id;
            const roomName = res.data.data.name;
            const hostUser = new User(res.data.data.host_connection_unit.id,roomId);
            const joinUsers = [hostUser];
            const localUser = new Me(res.data.data.host_connection_unit.id,roomId,localMediaStream);
            const room = new Room(
                roomId,
                roomName,
                hostUser,
                joinUsers,
                localUser,
            );
            room.#receiveSdpHandler();
            return room;
        });
    }

    /**
     * 部屋参加
     *
     * @param {string|int} id
     * @param {MediaStream} localMediaStream
     * @return {Promise<Room>}
     */
    static async join(id,localMediaStream){
        const newConnectionResponse = await window.axios.post(`room/${id}/connection_unit`);
        const connectionId = newConnectionResponse.data.data.id;

        const roomResponse = await window.axios.get(`room/${id}`);
        const roomId = roomResponse.data.data.id;
        const roomName = roomResponse.data.data.name;
        const hostUser = new User(roomResponse.data.data.host_user_id,roomId);
        const joinUsers = [];
        const localUser = new Me(connectionId,roomId,localMediaStream);
        roomResponse.data.data.connection_units.forEach(connection=>{
            const newUser = new User(connection.id,connection.room_id);
            joinUsers.push(newUser);
        });

        const room = new Room(
            roomId,
            roomName,
            hostUser,
            joinUsers,
            localUser,
        );

        room.#users.forEach(remoteUser => {
            if(remoteUser.id !== room.localUser.id){
                localUser.createConnectionFromLocal(remoteUser);
            }
        });
        room.#receiveSdpHandler();
        return room;
    }

    #receiveSdpHandler(){
        window.Echo.channel(`room.${this.#id}.${this.#localUser.id}`)
            .listen('OfferSdp',evt => {
                //Offerが届いた時
                const remoteUser = new User(evt.offerUserId,this.#id);
                let sdpInit = evt.sdp;
                sdpInit.sdp += "\n";
                const sdp = new RTCSessionDescription(sdpInit);
                //createConnection
                this.#localUser.createConnectionFromRemote(remoteUser,sdp,false);
            }).listen('AnswerSdp', evt => {
            //Answerが届いた時

            const remoteUser = this.#users.find(user => {
                return user.id === evt.answerUserId;
            });
            let sdpInit = evt.sdp;
            sdpInit.sdp += "\n";
            const sdp = new RTCSessionDescription(sdpInit)
            this.#localUser.createConnectionFromRemote(remoteUser,sdp,true);

        }).listen('IceCandidate', evt => {
            //ICE Candidateが届いた時
            const targetUser = this.#users.find(user => {
                return user.id === evt.sendUserId
            });
            const iceCandidate = new RTCIceCandidate(evt.iceCandidate);
            this.#localUser.saveIceCandidate(targetUser,iceCandidate);
        });
    }
}

export default Room;
