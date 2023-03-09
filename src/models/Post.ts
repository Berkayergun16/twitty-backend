import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
}, 
{
     timestamps: true 
});


export default mongoose.model('Post', PostSchema);