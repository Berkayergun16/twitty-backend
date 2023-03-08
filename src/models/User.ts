import mongoose from "mongoose";
import IUser from './../interfaces/IUser';

const UserSchema  = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        default: "",
    },
});

export default mongoose.model("User", UserSchema);