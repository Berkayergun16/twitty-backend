import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
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
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const createUser = async (req: Request, res: Response) => {
    const { name,username ,email, password } = req.body;

    try {
       const user= await User.create({
            name,
            username,
            email,
            password,
        });


    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        console.log(user);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
    
};

const updateUser = (req: Request, res: Response) => { };
const deleteUser = (req: Request, res: Response) => { };

export { getAllUsers, getUserById, createUser, updateUser, deleteUser ,loginUser};
