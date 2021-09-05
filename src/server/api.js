
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
