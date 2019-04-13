"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserController {
    createUser(req, res) {
        const userToBeCreated = new user_model_1.UserModel(req.body);
        userToBeCreated.save()
            .then((storedUser) => {
            res.status(200).send(storedUser);
        })
            .catch((err) => {
            console.log(err);
            res.status(500).send({
                error: 'Error while saving user. \n' + err.message
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map