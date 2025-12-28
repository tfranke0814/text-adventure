// index.js API backend
const express = require('express');
const http = require('http');

const config = require('./config/config');
const initWebSockets = require('./websocketHandler');
const llmRoutes = require('./routes/llmRoutes');

// Init backend server and websockets
const app = express();
const server = http.createServer(app);
const wss = initWebSockets(server);

// Routes
app.use(express.json());
app.use('/api/llm', llmRoutes);

app.get('/api/', (req, res) => {
  res.json({ message: 'HTTP routes are operational' });
});


server.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));

module.exports = { app, server, wss };
