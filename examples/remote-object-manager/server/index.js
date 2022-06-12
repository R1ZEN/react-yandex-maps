/* eslint-disable @typescript-eslint/no-var-requires */
const next = require('next');
const express = require('express');
const data = require('./data.json');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/tile', (req, res) => {
    res.jsonp({ error: null, data: data });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
