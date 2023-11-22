const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    id: { type: mongoose.Schema.Types.ObjectId },
    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email entered"
        }
    },
    mobile: {
        type: String, required: true, unique: true,
        validate: {
            validator: function (value) {
                return validator.isMobilePhone(value, 'any', { strictMode: false });
            },
            message: 'Invalid mobile number entered'
        }
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
    token: { type: String }
}, { versionKey: false });

const userModel = mongoose.model('users', userSchema);
module.exports = { userModel };