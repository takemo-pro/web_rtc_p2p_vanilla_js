class Room{
    /** @var {User} #host */
    #host;
    #guests = [];

    constructor(host) {
        this.#host = host;
    }
}

export default Room;
