import config from "./config";
class User{
    /** @var {string|int} */
    #id;
    get id(){
        return this.#id;
    }

    #roomId;
    get roomId(){
        return this.#roomId;
    }

    constructor(id,roomId) {
        this.#id = id;
        this.#roomId = roomId;
    }
}

export default User;
