export default {
    install: function (Vue, options) {
        Vue.prototype.$helpers = {
            getErrorMsg: function (err,defaultMessage="エラーが発生しました"){
                const res = err.response.data;
                if(res.code === 422){
                    return Object.values(res.data.errors)[0][0];
                }else if(res.code === 419){
                    axios.get('sanctum/csrf-cookie');
                    return "セッションの有効期限が切れました。再度実行してください";
                }else{
                    return defaultMessage;
                }
            }
        }
    }
}
