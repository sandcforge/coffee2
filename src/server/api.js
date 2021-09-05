const Mint = require('mint-filter').default;
const fs = require('fs');

const sensitiveWords = fs.readFileSync('src/server/keyword/ad.txt', 'utf8').split('\n');
sensitiveWords.push(...fs.readFileSync('src/server/keyword/politics.txt', 'utf8').split('\n'));
sensitiveWords.push(...fs.readFileSync('src/server/keyword/pornography.txt', 'utf8').split('\n'));
sensitiveWords.push(...fs.readFileSync('src/server/keyword/violence.txt', 'utf8').split('\n'));
const mint = new Mint(sensitiveWords);

const miscRoutes = (app) => {
  app.get('/api/now', (req, res) => {
    res.json({ now: Date.now(), appName: 'COFFEE' });
  });

  // Set a cooldown between kicking off the rocket.
  let cooldown = false;
  app.post('/api/kickoff', (req, res) => {
    // Ignore the reqest if still cooling down.
    if (cooldown) {
      res.sendStatus(408);
      return;
    }

    req.body.originalMessage = req.body.message;
    req.body.message = mint.filterSync(req.body.message).text;
    try {
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 0);
      req.app.get('socketIoServer').emit('H2C', JSON.stringify(req.body));
      res.sendStatus(200);
    }
    catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  });
};

module.exports = miscRoutes;
