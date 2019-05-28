"use strict";

const redis = require("redis");
const redisConfig = require("../config/redis.config");
const { promisify } = require("util");

let client = {};

const getInstance = (config = null) => {
    const _config = config || redisConfig;
    client = redis.createClient(_config.REDIS_URL);
    return {
        ...client,
        getAsync: promisify(client.get).bind(client),
        setAsync: promisify(client.set).bind(client),
        keysAsync: promisify(client.keys).bind(client)
    }
}

module.exports =  { getInstance }