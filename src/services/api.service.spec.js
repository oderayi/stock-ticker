const dotenv = require("dotenv");
const APIService = require("./api.service");
const AVClient = require("../clients/av.client");

dotenv.config({ path: ".test.env" });

const avConfig = {
  apiKey: process.env.ALPHA_VANTAGE_API_KEY,
  baseURL: "https://www.alphavantage.co"
};

const avClient = new AVClient(avConfig).getInstance();
const mockCache = { get: () => {}, set: () => {} };
const service = new APIService(avClient, mockCache, avConfig);

describe("Test APIService", () => {
  it("should return null with empty symbol", () => {
    const data = await service.getQuote(null);
    expect(data).toBeNull();
  });
  it("should return Google's stock quote as at now", async () => {
    setTimeout(async () => {
      const data = await service.getQuote("GOOG");
      expect(data).toBeDefined();
      expect(data["Global Quote"]["01. symbol"]).toEqual("GOOG");
      expect(data).toMatchObject({
        "Global Quote": expect.objectContaining({
          "01. symbol": "GOOG",
          "02. open": expect.any(String),
          "03. high": expect.any(String),
          "04. low": expect.any(String),
          "05. price": expect.any(String),
          "06. volume": expect.any(String),
          "07. latest trading day": expect.any(String),
          "08. previous close": expect.any(String),
          "09. change": expect.any(String),
          "10. change percent": expect.any(String)
        })
      });
    });
  });

  it("should return Google's daily quote", async () => {
    setTimeout(async () => {
      const data = await service.getDailyTimeSeries("GOOG");
      expect(data).toBeDefined();
      expect(data["Meta Data"]).toBeDefined();
      expect(data["Meta Data"]).toMatchObject({
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "GOOG"
      });
      expect(data["Time Series (Daily)"]).toBeDefined();
      const seriesEntries = Object.entries(data["Time Series (Daily)"]);
      const entry = seriesEntries.pop();
      expect(entry[1]).toMatchObject({
        "1. open": expect.any(String),
        "2. high": expect.any(String),
        "3. low": expect.any(String),
        "4. close": expect.any(String),
        "5. volume": expect.any(String)
      });
    });
  });

  it("should return Google's weekly quote", async () => {
    setTimeout(async () => {
      const data = await service.getWeeklyTimeSeries("GOOG");
      expect(data).toBeDefined();
      expect(data["Meta Data"]).toBeDefined();
      expect(data["Meta Data"]).toMatchObject({
        "1. Information": "Weekly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "GOOG"
      });
      expect(data["Weekly Time Series"]).toBeDefined();
      const seriesEntries = Object.entries(data["Weekly Time Series"]);
      const entry = seriesEntries.pop();
      expect(entry[1]).toMatchObject({
        "1. open": expect.any(String),
        "2. high": expect.any(String),
        "3. low": expect.any(String),
        "4. close": expect.any(String),
        "5. volume": expect.any(String)
      });
    }, 1000);
  });

  it("should return Google's monthly quote", async () => {
    setTimeout(async () => {
      const data = await service.getMonthlyTimeSeries("GOOG");
      expect(data).toBeDefined();
      expect(data["Meta Data"]).toBeDefined();
      expect(data["Meta Data"]).toMatchObject({
        "1. Information": "Monthly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "GOOG"
      });
      expect(data["Monthly Time Series"]).toBeDefined();
      const seriesEntries = Object.entries(data["Monthly Time Series"]);
      const entry = seriesEntries.pop();
      expect(entry[1]).toMatchObject({
        "1. open": expect.any(String),
        "2. high": expect.any(String),
        "3. low": expect.any(String),
        "4. close": expect.any(String),
        "5. volume": expect.any(String)
      });
    }, 1000);
  });

  it("should return symbol search result for Google", async () => {
    const data = await service.searchSymbol("GOOG");
    expect(data).toBeDefined();
    expect(Array.isArray(data["bestMatches"])).toBe(true);
    const match = data["bestMatches"][0];
    expect(match).toMatchObject({
      "1. symbol": "GOOG",
      "2. name": "Alphabet Inc.",
      "3. type": "Equity",
      "4. region": "United States"
    });
  });
  
  it("should return null with empty search keyword", () => {
    const data = await service.search();
    expect(data).toBeNull();
  });
});
