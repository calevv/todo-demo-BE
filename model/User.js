const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;
const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    return obj;
};

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '3d' });
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
