const axios = require("axios");
const avConfig = require("../config/av.config");

const AVClient = axios.create({
    baseURL: avConfig.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

module.exports = AVClient;