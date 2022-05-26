import User from "./User";
import Connection from "./Peer";
import Peer from "./Peer";

/**
 * 自分自身(LocalUser)
 */
class Me extends User
{
    /** @var {Array<Peer>} */
    #peerConnections = [];
    get peerConnections(){
        return this.#peerConnections;
    }

    /** @var {MediaStream} */
    #localMediaStream;
    get localMediaStream(){
        return this.#localMediaStream;
    }

    constructor(id,roomId,localMediaStream) {
        super(id,roomId);
        this.#localMediaStream = localMediaStream;
    }

    /**
     * Peerオブジェクトを生成・取得してセットする
     *
     * @param {User} remoteUser
     * @return {Peer}
     */
    #createNewConnection(remoteUser){
        const existConnections = this.#peerConnections.filter(peer=>{
            return peer.localUser.id === this.id && peer.remoteUser.id === remoteUser.id;
        });
        if(existConnections.length <= 0){
            const newPeer = new Peer(this,remoteUser);
            this.#peerConnections.push(newPeer);
            return newPeer;
        }else{
            return null;
        }
    }

    /**
     * joinする場合(localUserからoffer)
     *
     * @param {User} remoteUser
     */
    createConnectionFromLocal(remoteUser){
        const peer = this.#createNewConnection(remoteUser);
        if(!peer){
            return;
        }else{
            peer.sendOfferSdp(this.roomId);
        }
    }

    /**
     * AnswerSDPを受け取って作成する場合
     *
     * @param {User} remoteUser
     * @param {RTCSessionDescription} remoteSdp
     * @param {boolean} isAnswer 受け取ったSessionDescriptionのタイプ
     */
    createConnectionFromRemote(remoteUser,remoteSdp,isAnswer=false){
        if(isAnswer){
            const targetPeer = this.#peerConnections.find(peer => {
                return peer.remoteUser.id === remoteUser.id;
            });
            targetPeer.saveRemoteSdp(remoteSdp);
        }else{
            const peer = this.#createNewConnection(remoteUser);
            if(!peer){
                return;
            }else{
                peer.saveRemoteSdp(remoteSdp);
                peer.sendAnswerSdp(this.roomId);
            }
        }
    }

    /**
     * WebSocketで届いたIceCandidateを保存する
     *
     * @param targetUser
     * @param ice_candidate
     */
    saveIceCandidate(targetUser,ice_candidate){
        const targetPeer = this.#peerConnections.find(peer => {
            return peer.remoteUser.id === targetUser.id;
        });
        targetPeer.saveIceCandidate(ice_candidate);
    }
}

export default Me;
