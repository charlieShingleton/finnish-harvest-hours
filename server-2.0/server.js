require("dotenv").config();
const debug = require("debug")("finnish-harvest-hours:server");
const http = require("http");

const app = require("./app.js");
const db = require("./db.js");

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || 8080;
app.set("port", normalizePort(port));

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
server.keepAliveTimeout = 30000;

/**
 * Init database and start listening on server.
 */

db.connectMongoose()
  .then(() => {
    if (!module.parent) {
      /**
       * Listen on provided port, on all network interfaces.
       */
      server.listen(port, function serverInitiliased() {
        const environment = process.env.NODE_ENV || "development";
        console.log(
          `Finnish-harvest-hours started and listening on port ${port}`
        );
        console.log(`Configured environment is ${environment.toUpperCase()}`);
      });
      server.on("error", onError);
      server.on("listening", onListening);
    }
  })
  .catch(err => {
    console.error(
      new Error(
        `Error starting Finnish-harvest-hours when initialising DB: ${err}`
      )
    );
    process.exit(1);
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portAsNum = Number(val);
  if (Number.isNaN(portAsNum)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    /* eslint-disable */
    case "EACCES":
      console.error(new Error(`${bind} requires elevated privileges`));
      process.exit(1);
    case "EADDRINUSE":
      console.error(new Error(`${bind} is already in use`));
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
