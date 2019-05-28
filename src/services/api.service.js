const AVClient = require("../clients/av.client");
const CacheService = require("../services/cache.service");
const apikey = require("../config/av.config").apiKey;
const getWeekNumber = require("../lib/util").getWeekNumber;

class APIService {
  constructor(client = null, cache = null) {
    this.client = client || AVClient;
    this.cache = cache || new CacheService();
  }

  async getQuote(symbol) {
    return await this._query("GLOBAL_QUOTE", symbol);
  }

  async getDailyTimeSeries(symbol) {
    const cacheKey = `${symbol}-${new Date().toISOString().slice(0, 10)}`;
    return await this._query("TIME_SERIES_DAILY", symbol, cacheKey);
  }

  async getWeeklyTimeSeries(symbol) {
    const cacheKey = `${symbol}-${getWeekNumber(new Date()).join("-week-")}`;
    return await this._query("TIME_SERIES_WEEKLY", symbol, cacheKey);
  }

  async getMonthlyTimeSeries(symbol) {
    const cacheKey = `${symbol}-${new Date().toISOString().slice(0, 7)}`;
    return await this._query("TIME_SERIES_MONTHLY", symbol, cacheKey);
  }

  async searchSymbol(keywords) {
    if (!keywords) {
      return;
    }
    const result = await this.client.get("/query", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords,
        apikey
      }
    });
    return result.data;
  }

  async _query(func, symbol, cacheKey) {
    if (!symbol) {
      return;
    }
    const cacheEntry = await this.cache.get(cacheKey);
    if (cacheEntry) {
      return cacheEntry;
    }
    const result = await this.client.get("/query", {
      params: {
        function: func,
        symbol,
        apikey
      }
    });
    const newEntry = result.data;
    this.cache.set(cacheKey, newEntry);
    return newEntry;
  }
}

module.exports = APIService;
