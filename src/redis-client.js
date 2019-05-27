'use strict';

const redis = require('redis');
const redisConfig = require('./config/redis-config');
const { promisify } = require('util');

const client = redis.createClient(redisConfig.REDIS_URL)

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client)
};