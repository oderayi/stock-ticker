"use strict";

const express = require("express");
const APIService = require("../services/api.service");
const errorHandler = require("../lib/error-handler");

const api = express.Router();
const service = new APIService();

api.get("/quotes/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await service.getQuote(symbol);
    res.send(data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

api.get("/daily/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await service.getDailyTimeSeries(symbol);
    res.send(data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

api.get("/weekly/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await service.getWeeklyTimeSeries(symbol);
    res.send(data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

api.get("/monthly/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await service.getMonthlyTimeSeries(symbol);
    res.send(data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

api.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const data = await service.searchSymbol(q);
    res.send(data);
  } catch (err) {
    errorHandler(res, 500, err);
  }
});

module.exports = api;
