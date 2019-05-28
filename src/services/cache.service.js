const redisClient = require("../clients/redis.client");

class CacheService {
    constructor(client = null) {
        this.client = client || redisClient;
    }

    async get(key) {
        const rawData = await this.client.getAsync(key);
        return JSON.parse(rawData);
    }

    async set(key, value) {
        this.client.setAsync(key, JSON.stringify(value));
    }
}

module.exports = CacheService;