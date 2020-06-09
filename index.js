// Require packages and set the port
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const http = require('http');
const app = express();
const server = http.createServer(app)

// Use Node.js body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

routes(app);

// Start the server
server.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});

