const axios = require("axios");
const avConfig = require("../config/av.config");

class AVClient {
    /**
     * Return http client for Alpha Vantage API.
     *
     * @returns AxiosInstance
     */
    static getInstance() {
        const { baseURL } = avConfig;

        return axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

module.exports = AVClient;