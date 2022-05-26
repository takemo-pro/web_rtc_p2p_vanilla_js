import Room from "./Room";
import config from "./config";
class Peer
{
    /** @var {string|int} */
    #peerId;
    get peerId(){
        return this.#peerId;
    }

    /** @var {string|int} */
    #roomId;
    get roomId(){
        return this.#roomId;
    }


    /** @var {Me} 他のユーザーと重複しないもの */
    #localUser;
    get localUser(){
        return this.#localUser;
    }

    /** @var {User} */
    #remoteUser;
    get remoteUser(){
        return this.#remoteUser;
    }

    /** @var {RTCPeerConnection} */
    #peerConnection;
    get peerConnection(){
        return this.#peerConnection;
    }

    /** @var {MediaStream} */
    #remoteMediaStream;
    get remoteMediaStream(){
        return this.#remoteMediaStream;
    }

    /** @var {HTMLMediaElement} */
    #mediaDom;
    get mediaDom(){
        return this.#mediaDom;
    }

    /**
     * Private constructor...
     *
     * @param {Me} localUser
     * @param {User} remoteUser
     */
    constructor(localUser,remoteUser){
        this.#localUser = localUser;
        this.#remoteUser = remoteUser;
        this.#peerConnection = new RTCPeerConnection(config.connectionConfig);
        this.#localUser.localMediaStream.getTracks().forEach(track=>{
            this.#peerConnection.addTrack(track,this.#localUser.localMediaStream);
        });
        this.#registerPeerConnectionEvents();
    }

    /**
     * OfferSDPを作成・送信する
     *
     * @param roomId
     * @returns {Promise<AxiosResponse<any>>}
     */
    async sendOfferSdp(roomId){
        const localSdp = await this.#peerConnection.createOffer();
        await this.#peerConnection.setLocalDescription(localSdp);
        return window.axios.post(`room/${roomId}/offer`,{
            local_user_id : this.#localUser.id,
            remote_user_id : this.#remoteUser.id,
            sdp : localSdp,
        });
    }

    /**
     * AnswerSDPを作成・送信する
     *
     * @param roomId
     * @return {Promise<AxiosResponse<any>>}
     */
    async sendAnswerSdp(roomId){
        const localSdp = await this.#peerConnection.createAnswer();
        await this.#peerConnection.setLocalDescription(localSdp);
        return window.axios.post(`room/${roomId}/answer`,{
            local_user_id : this.#localUser.id,
            remote_user_id : this.#remoteUser.id,
            sdp : localSdp,
        });
    }

    saveRemoteSdp(sessionDescription){
        this.#peerConnection.setRemoteDescription(sessionDescription);
    }

    /**
     * @param {RTCIceCandidate} iceCandidate
     */
    saveIceCandidate(iceCandidate){
        this.#peerConnection.addIceCandidate(iceCandidate);
    }


    #registerPeerConnectionEvents(){
        //接続時 event
        this.#peerConnection.addEventListener('track',evt=>{
            console.log(evt);
            this.#remoteMediaStream = this.#remoteMediaStream || new MediaStream;
            this.#remoteMediaStream.addTrack(evt.track);
            const existMediaElement = document.getElementById(`remote_media_${this.#remoteUser.id}`);
            if(!(existMediaElement instanceof HTMLMediaElement)){
                //新規メディア生成
                const newMediaElement = config.remoteMediaDomBase();
                config.remoteMediaParent.insertAdjacentElement('afterbegin',newMediaElement);
                newMediaElement.id = `remote_media_${this.#remoteUser.id}`;
                newMediaElement.srcObject = this.#remoteMediaStream;
                newMediaElement.play().then(() => {
                    console.log("play remote!!!!!!")}
                ).catch(err => {
                    console.error('RemoteMediaの再生に失敗しました : ',err);
                });
            }else{
                existMediaElement.srcObject.addTrack(evt.track);
            }
        });

        this.#peerConnection.addEventListener('icecandidate', evt=>{
            if(evt.candidate){
                //note: trickle ice
                window.axios.post(`room/${this.#localUser.roomId}/ice_candidate`,{
                    local_user_id: this.#localUser.id,
                    remote_user_id: this.#remoteUser.id,
                    ice_candidate: evt.candidate
                });
            }
        });

        this.#peerConnection.addEventListener('iceconnectionstatechange',evt=>{
            if(this.#peerConnection.iceConnectionState === "disconnected"){
                //todo: hangup
            }
        });
    }

}

export default Peer;
