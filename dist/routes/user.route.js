"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoute {
    constructor(router) {
        const userRouter = express_1.Router();
        const userController = new user_controller_1.UserController();
        router.use('/user', userRouter);
        userRouter.post('/register', userController.createUser.bind(userController));
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map