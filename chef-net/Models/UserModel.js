const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;