import { Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("user", "name username");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    let { description, userId } = req.body;

    if ((<any>req).user) {
      userId = (<any>req).user._id;
    }

    const post = await Post.create({
      description,
      user: userId,
    });

    if (post) {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { posts: post._id },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user: id });
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likePost = async (req: Request, res: Response) => {
 

  const postId= req.params.id;
  const userId = (<any>req).user._id;

  if (!postId || !userId) {
    res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    const post = await Post.findById(postId);

    if (post.likes.includes(<any>userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export { getAllPosts, getSinglePost, createPost, getPostsByUser, likePost };
