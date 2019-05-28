const axios = require("axios");
const avConfig = require("../config/av.config");

class AVClient {
    constructor(config = null) {
        this.config = config || avConfig;
    }

    getInstance() {
        return axios.create({
            baseURL: this.config.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

module.exports = AVClient;