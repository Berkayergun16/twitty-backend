import { Request, Response } from "express";
import User from "../models/User";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = (req: Request, res: Response) => {};
const deleteUser = (req: Request, res: Response) => {};

const followUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const loggedInUserId = (<any>req).user._id;

  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(loggedInUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await currentUser.updateOne({ $push: { following: id } });
      res.status(200).json({
        success: true,
        message: "User has been followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unFollowUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const loggedInUserId = (<any>req).user._id;

  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(loggedInUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await currentUser.updateOne({ $pull: { following: id } });
      res.status(200).json({
        success: true,
        message: "User has been unfollowed",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser, followUser };
