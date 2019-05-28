const AVClient = require("../clients/av.client");
const CacheService = require("../services/cache.service");
const avConfig = require("../config/av.config");
const { getWeekNumber } = require("../lib/util");

class APIService {
  constructor(client = null, cache = null, config = null) {
    this.client = client || new AVClient().getInstance();
    this.cache = cache || new CacheService();
    this.config = config || avConfig;
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
        apikey: this.config.apiKey
      }
    });
    return result.data;
  }

  async _query(func, symbol, cacheKey) {
    if (!symbol) {
      return;
    }
    if (cacheKey) {
      const cacheEntry = await this.cache.get(cacheKey);
      if (cacheEntry) {
        return cacheEntry;
      }
    }

    const result = await this.client.get("/query", {
      params: {
        function: func,
        symbol,
        apikey: this.config.apiKey
      }
    });
    const newEntry = result.data;
    if (cacheKey) {
        this.cache.set(cacheKey, newEntry);
    }
    return newEntry;
  }
}

module.exports = APIService;
