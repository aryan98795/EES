import mongoose, { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user', 'coordinator'],
        required: true,
    },
});

export default model('User', UserSchema);