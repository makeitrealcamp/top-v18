const http = require('http');

const app = require('./server');
const { connect } = require('./server/database');
const config = require('./server/config');

const { database, port } = config;

// Database
connect({
  url: database.url,
  username: database.username,
  password: database.password,
});

// Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
