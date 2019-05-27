"use strict";

const express = require("express");
const redisClient = require("../clients/redis.client");
const avClient = require("../clients/av.client");
const apikey = require("../config/av.config").apiKey;
const errorHandler = require("../lib/error-handler");

const api = express.Router();

// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo

api.get("/quotes", async (req, res) => {
  const { symbol } = req.query;
  try {
    const result = await avClient.getInstance().get("/query", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey
      }
    });
    res.send(result.data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

// api.get("/store/:key", async (req, res) => {
//   const { key } = req.params;
//   const value = req.query;
//   await redisClient.setAsync(key, JSON.stringify(value));
//   return res.send("Success");
// });

// api.get("/:key", async (req, res) => {
//   const { key } = req.params;
//   const rawData = await redisClient.getAsync(key);
//   return res.json(JSON.parse(rawData));
// });

module.exports = api;
