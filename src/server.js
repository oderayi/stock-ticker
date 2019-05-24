'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world.\n');
});

app.use(router);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
