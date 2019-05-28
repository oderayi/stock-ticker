
const AVClient = require("./av.client");

describe("Test AVClient", () => {
    it("should return AxiosInstance", () => {
        const client = new AVClient({ baseURL: "http://mock"}).getInstance();
        expect(typeof client).toEqual("function");
    });
});