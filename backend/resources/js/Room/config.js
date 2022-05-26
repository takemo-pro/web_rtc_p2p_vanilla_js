export default {
    /**
     * 自端末のメディアの許可設定
     */
    mediaType: {
        audio: true,
        video: true,
    },

    /**
     * RTCPeerConnectionのconfig
     */
    connectionConfig: {
        iceServers: []
    },

    /**
     * 自端末のメディアを表示するDOM
     */
    localMediaDom: document.getElementById('local_media'),

    /**
     * リモートメディアを表示するコンテナ
     */
    remoteMediaParent: document.getElementById('remote_media_container'),

    /**
     * リモートメディアの格納先にするDOMのベース
     */
    remoteMediaDomBase: ()=> {
        const media = document.createElement('video');
        media.className = 'remote-media';
        media.width = 400;
        media.height = 300;
        media.style = "background: black;";
        return media;
    }
}
