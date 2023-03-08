import { Request, Response } from 'express';
import User from '../models/User';

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
    const { name, email, password } = req.body;

    try {
        await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            message: 'User created',
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


const updateUser = (req: Request, res: Response) => { };
const deleteUser = (req: Request, res: Response) => { };

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
