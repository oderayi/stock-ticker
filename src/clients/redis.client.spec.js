
const RedisClient = require("./redis.client");

describe("Test RedisClient", () => {
    it("should return RedisClient", () => {
        const client = RedisClient.getInstance({ redisURL: "http://localhost"});
        expect(typeof client).toEqual("object");
        expect(client).toMatchObject({
            getAsync: expect.any(Function),
            setAsync: expect.any(Function)
        })
    });
});