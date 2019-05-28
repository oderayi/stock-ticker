"use strict";

const express = require("express");
const helmet = require("helmet");
const apiRouter = require("./routers/api.router");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(helmet());
app.use("/api/v1/", apiRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
