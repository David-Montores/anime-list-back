const express = require('express');
const cors = require('cors');
const mongodbConnection = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.animesPath = "/api/animes";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await mongodbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.animesPath, require("../routes/animes.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Application running on port:", this.port);
    });
  }
}

module.exports = Server;