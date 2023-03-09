import { Request, Response } from 'express';
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
        const { id } = (<any>req).user;

        if (!description || !id) {
            return res.status(400).json({
                success: false,
                message: "Please provide description or login",
            });
        }

        const post = await Post.create({
            description,
            user: id
        });

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




export {getAllPosts, getSinglePost,createPost}