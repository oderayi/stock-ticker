"use strict";

const express = require("express");
const { param, query, validationResult } = require("express-validator/check");
const { sanitizeParam, sanitizeQuery } = require("express-validator/filter");
const APIService = require("../services/api.service");
const errorHandler = require("../lib/error-handler");

const api = express.Router();
const service = new APIService();

api.get(
  "/quotes/:symbol",
  [
    param("symbol")
      .exists()
      .trim()
      .isLength({ min: 1, max: 10 }),
    sanitizeParam("symbol")
      .trim()
      .escape()
  ],
  async (req, res) => {
    if (!_validate(req, res)) return;
    try {
      const symbol = req.params.symbol;
      console.log("symbol: ", symbol);
      const data = await service.getQuote(symbol);
      res.send(data);
    } catch (err) {
      errorHandler(res, 500, err);
    }
  }
);

api.get(
  "/daily/:symbol",
  [
    param("symbol")
      .exists()
      .trim()
      .isLength({ min: 1, max: 10 }),
    sanitizeParam("symbol")
      .trim()
      .escape()
  ],
  async (req, res) => {
    if (!_validate(req, res)) return;
    try {
      const symbol = req.params.symbol;
      const data = await service.getDailyTimeSeries(symbol);
      res.send(data);
    } catch (err) {
      errorHandler(res, 500, err);
    }
  }
);

api.get(
  "/weekly/:symbol",
  [
    param("symbol")
      .exists()
      .trim()
      .isLength({ min: 1, max: 10 }),
    sanitizeParam("symbol")
      .trim()
      .escape()
  ],
  async (req, res) => {
    if (!_validate(req, res)) return;
    try {
      const symbol = req.params.symbol;
      const data = await service.getWeeklyTimeSeries(symbol);
      res.send(data);
    } catch (err) {
      errorHandler(res, 500, err);
    }
  }
);

api.get(
  "/monthly/:symbol",
  [
    param("symbol")
      .exists()
      .trim()
      .isLength({ min: 1, max: 10 }),
    sanitizeParam("symbol")
      .trim()
      .escape()
  ],
  async (req, res) => {
    if (!_validate(req, res)) return;
    try {
      const symbol = req.params.symbol;
      const data = await service.getMonthlyTimeSeries(symbol);
      res.send(data);
    } catch (err) {
      errorHandler(res, 500, err);
    }
  }
);

api.get(
  "/search",
  [
    query("q")
      .exists()
      .trim()
      .isLength({ min: 1, max: 255 }),
    sanitizeQuery("q")
      .trim()
      .escape()
  ],
  async (req, res) => {
    if (!_validate(req, res)) return;
    try {
      const { q } = req.query;
      const data = await service.searchSymbol(q);
      res.send(data);
    } catch (err) {
      errorHandler(res, 500, err);
    }
  }
);

const _validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }
  return true;
};

module.exports = api;
