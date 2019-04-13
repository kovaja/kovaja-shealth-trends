"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("./user.route");
class Routes {
    handlePingRequest(req, res) {
        res.status(200).send({
            message: 'PONG! ' + new Date()
        });
    }
    initRoutes(app) {
        const router = express_1.Router();
        new user_route_1.UserRoute(router);
        app.use('/api', router);
        app.get('/api/ping', this.handlePingRequest.bind(this));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map