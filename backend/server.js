// import du package http pour créer le serveur
const http = require("http");
// import de l'application express app.js
const app = require("./app");

// on normalise le format du port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// on renvoie à l'app soit la variable environnementale port, soit le port 3000 par défaut après normalisation
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// on recherche les éventuelles erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// création du serveur
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("listening on " + bind);
});

server.listen(port);
