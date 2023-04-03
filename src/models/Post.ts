import mongoose , {Schema} from "mongoose";
import IPost from './../interfaces/IPost';

const PostSchema = new Schema<IPost>({
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
        },
    ],

}, 
{
     timestamps: true 
});


export default mongoose.model('Post', PostSchema);