const express = require('express');
const next = require('next');
const axios = require('axios');

// eslint-disable-next-line import/no-extraneous-dependencies
const proxyMiddleware = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (process.env.NODE_ENV === 'development') {
    server
      .use(
        proxyMiddleware('/api', {
          target: 'https://takwimu.africa',
          changeOrigin: true
        })
      )
      .use('/flourish/:id', async (req, res) => {
        axios
          .get(
            `https://takwimutech.wpengine.com/wp-json/hurumap-data/flourish/${req.params.id}`
          )
          .then(({ data }) => {
            res.send(
              data.replace(
                /localhost:8080|takwimutech.wpengine.com|takwimu.africa/gi,
                `http://localhost:3000`
              )
            );
          })
          .catch(() => res.sendStatus(400));
      });
  }
  server.use(handle).listen(port, err => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
