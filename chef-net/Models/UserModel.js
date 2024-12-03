import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: function () { return !this.googleId; } },
        image: { type: String, default: '/upload/defaultpf.png' },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
