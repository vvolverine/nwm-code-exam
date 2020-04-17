'use strict';

const express = require('express');

// Constants
const PORT = 7070;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.json({greetings: 'Hello!'});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);