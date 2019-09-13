const axios = require('axios');

module.exports = app => {
  app.use('/flourish/:id', async (req, res) => {
    axios
      .get(`https://takwimu.africa/flourish/${req.params.id}`)
      .then(({ data }) => {
        res.send(
          data.replace(/https:\/\/takwimu.africa/gi, `http://localhost:3000`)
        );
      })
      .catch(() => res.send('Error'));
  });
};
