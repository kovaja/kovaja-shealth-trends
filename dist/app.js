"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
const routes_1 = require("./routes/routes");
const CLIENT_BUILD_PATH = '../../client/build';
class App {
    constructor() {
        this.app = express();
        this.config();
        this.setupMongo();
    }
    serveIndex(req, res) {
        res.sendFile(path.join(__dirname, CLIENT_BUILD_PATH, 'index.html'));
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        const staticPath = path.join(__dirname, CLIENT_BUILD_PATH);
        this.app.use(express.static(staticPath));
        this.app.get('/', this.serveIndex.bind(this));
        this.route = new routes_1.Routes();
        this.route.initRoutes(this.app);
    }
    setupMongo() {
        // mongoose.Promise = global.Promise;
        mongoose.connect(config_1.config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map