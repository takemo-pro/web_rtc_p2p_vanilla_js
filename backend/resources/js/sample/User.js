import Connection from "./Connection";

class User {
    static #mediaOption = {video: true, audio: true};

    /** @var {string} #id */
    #id;
    /** @var {array} #localSDP */
    #localSDP;
    /** @var {MediaStream} #localStream */
    #localStream;
    /** @var {Element} #localMediaDom */
    #localMediaDom;
    /** @var {Connection[]} #connections */
    #connections = [];

    constructor(id) {
        this.#id = id;
    }

    get userId(){
       return this.#id;
    }

    /**
     * 自端末のメディアを取得・表示する
     *
     * @param {MediaElementAudioSourceNode} targetMediaElement
     */
    async startLocalMedia(targetMediaElement) {
        try{
            this.#localStream = await navigator.mediaDevices.getUserMedia(User.#mediaOption)
            this.#localMediaDom = targetMediaElement;
            this.#localMediaDom.srcObject = this.#localStream;
            this.#localMediaDom.play();
            this.#localMediaDom.volume = 0.1;
        }catch(err){
            console.error('startLocalMediaError: ',err);
        }
    }

    /**
     * メディアを停止する
     */
    stopMedia() {
        //todo: 自分の動画を入れているならそれを止める処理を書く
        //media domのリセット
        this.#localMediaDom.pause();
        this.#localMediaDom.srcObject = null;
        window.URL.revokeObjectURL(this.#localMediaDom);
        this.#localMediaDom.src = '';

        //再生停止
        this.#localStream.getTracks()?.forEach(track=>{
            track.stop();
        });
    }

    /**
     * 新規でofferを作成
     */
    makeOffer() {
        const connection = new Connection(this);
        connection.createOffer();
    }

    makeAnswer(){

    }

    /**
     * 受け取ったSDPを保存し必要な場合はAnswerSDPを送信する
     *
     * @param sessionDescription
     * @param userId
     */
    async receiveSdp(sessionDescription,userId) {
        const existConnection = this.#findConnectionByUserId(userId);
        if(existConnection instanceof Connection){
            //すでに接続している場合(相手からのAnswerSDPを受け取る処理)
            existConnection.saveRemoteSDP(sessionDescription);
        }else{
            //新規でreceiveした場合(AnswerSDPを相手に返す処理)
            const newConnection = new Connection(new User(userId));
            console.log('save remote sdp : ',sessionDescription);
            newConnection.saveRemoteSDP(sessionDescription).then(()=>{
                this.makeAnswer();
            });
        }
    }

    /**
     * userIdでConnectionを取得
     *
     * @param userId
     * @returns {boolean|Connection}
     */
    #findConnectionByUserId(userId){
        this.#connections.forEach(connection=>{
            if(connection.answerUser.userId === userId){
                return connection;
            }
        });
        return false;
    }
}

export default User;
