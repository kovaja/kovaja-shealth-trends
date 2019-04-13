"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const SALT_WORK_FACTOR = 10;
const userSchemaDef = {
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        index: {
            unique: true
        }
    },
    password: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
};
const UserSchema = new mongoose_1.Schema(userSchemaDef);
UserSchema.pre('save', function (next) {
    if (this.isModified('password') === false)
        return next();
    const onHashDone = (err, hash) => {
        if (err)
            return next(err);
        this.set('password', hash);
        next();
    };
    const onSaltGenerated = (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(this.get('password'), salt, onHashDone);
    };
    bcrypt.genSalt(SALT_WORK_FACTOR, onSaltGenerated);
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
exports.UserModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map