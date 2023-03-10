import mongoose from "mongoose";
import IPost from './../interfaces/IPost';

const PostSchema = new mongoose.Schema<IPost>({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, 
{
     timestamps: true 
});


export default mongoose.model('Post', PostSchema);