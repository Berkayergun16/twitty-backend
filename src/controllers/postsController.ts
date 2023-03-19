import { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';


const getAllPosts = async (req: Request, res: Response) => {
    
    try {
        const posts = await Post.find().populate('user', 'name username');
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createPost = async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const { _id } = (<any>req).user;
        
        const post = await Post.create({
            description,
            user: _id
        });

        if (post) {
            await User.findByIdAndUpdate(_id, {
                $push: { posts: post._id }
            }, { new: true });
        }

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}    

const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ user: id });
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export { getAllPosts, getSinglePost, createPost, getPostsByUser }