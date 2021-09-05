const compression = require('compression');
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const miscRoutes = require('./api.js');
const { envConfig } = require('./constants.js');

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const socketIoServer = new Server(httpServer);
app.set('socketIoServer', socketIoServer);
const rocketInit = {
  status:[-1,-1,-1,-1,-1],
  message:['','','','',''],
}
app.set('rocket',rocketInit);
app.set('totalStatusNumber', 1);
miscRoutes(app);

const outputPath = path.resolve(process.cwd(), 'dist');
app.use(compression());
app.use('/', express.static(outputPath));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(outputPath, 'index.html'));
});

httpServer.listen(envConfig.port, () => {
  console.log(`Listening on port ${envConfig.port}!`);
  console.log(`NodeEnv: ${envConfig.nodeEnv}`);
});

socketIoServer.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("C2H", (payload) => {
    socket.emit('H2C', JSON.stringify({ rocketIndex: 0, statusId: 1 }));
  });
});

module.exports = { socketIoServer };
