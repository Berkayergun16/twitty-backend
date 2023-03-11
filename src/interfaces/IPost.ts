import mongoose from 'mongoose';
export default interface IPost {
    description: string;
    image?: string;
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}