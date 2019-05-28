const CacheService = require("../services/cache.service");

const mockClient = { getAsync: (key) => JSON.stringify({"key": "value"}), setAsync: (...params) => {} }
const service = new CacheService(mockClient);

describe("Test CacheService", () => {
    it("should set value in cache", async () => {
        expect(await service.set("key", "value")).toBeFalsy();
    });
    it("should return value from cache", async () => {
        expect(await service.get("key")).toMatchObject({
            key: "value"
        })
    });
})