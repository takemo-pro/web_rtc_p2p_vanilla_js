class Connection
{
    static #config = {"iceServers": []};
    static #offerPath = "sample_signaling"

    /** @var {RTCPeerConnection} peerConnection */
    #peerConnection;
    /** @var {User} offerUser */
    #offerUser;
    /** @var {User} answerUser */
    answerUser;

    /**
     * Connection constructor
     *
     * @param {User} offerUser
     */
    constructor(offerUser) {
        this.#offerUser = offerUser;
        this.#peerConnection = new RTCPeerConnection(Connection.#config);
        this.#registerPeerConnectionEventListener();
    }

    /**
     * RTCPeerConnectionのイベント登録
     */
    #registerPeerConnectionEventListener(){
        // on get remote stream
        this.#peerConnection.addEventListener('ontrack',e=>{
            //event.streams[0]をanswerUserのmediaにセットする
        });

        // on get local ice candidate
        this.#peerConnection.addEventListener('onicecandidate',e=>{
            if(e.candidate){
               //todo: trickle iceはice candidateを送信
            }
        });

        // when need to exchange ssdp
        this.#peerConnection.addEventListener('onnegotiationneeded',e=>{

        });

        // other events
        this.#peerConnection.addEventListener('onicecandidateerror',e=>{

        });
        this.#peerConnection.addEventListener('onsignalingstatechange',e=>{

        });
        this.#peerConnection.addEventListener('oniceconnectionstatechange',e=>{

        });
        this.#peerConnection.addEventListener('onicegatheringstatechange',e=>{

        });
        this.#peerConnection.addEventListener('onconnectionstatechange',e=>{

        });
        this.#peerConnection.addEventListener('onremovetrack',e=>{
            //todo: media 再生停止
        });
    }

    /**
     * SDP作成 / 登録
     *
     * @returns {Promise<void>}
     */
    async createOffer() {
        try{
            const sessionDescription = await this.#peerConnection.createOffer();
            await this.#peerConnection.setLocalDescription(sessionDescription);
            //todo: trickle ice はここですぐにSDPを送る(ice candidateは逐次送信)
            this.#sendSdp(sessionDescription,this.#offerUser.userId);
        }catch(err){
            console.error('Create Offer Error: ',err);
        }
    }

    async saveOfferedSDP(sessionDescription){
    }

    /**
     * AnswerSDPを保存する
     *
     * @param sessionDescription
     */
    saveRemoteSDP(sessionDescription){
        return this.#peerConnection.setRemoteDescription(sessionDescription);
    }

    /**
     * 指定のSDPを送信する相手に送信する
     *
     * @param {string} sessionDescription
     * @param {string} userId
     */
    #sendSdp(sessionDescription,userId) {
        //todo : send SDP to signaling server ...
        axios.post(Connection.#offerPath,{sdp:sessionDescription,user_id:userId});
    }

    /**
     * 接続を解除する
     */
    closeConnection(){
        //todo: close media
        this.answerUser.stopMedia();
        this.#peerConnection.close();
        this.#peerConnection = null;
    }
}

export default Connection;
