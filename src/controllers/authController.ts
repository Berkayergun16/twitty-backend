import { Request, Response } from 'express';
import { createToken } from '../helpers/authHelpers';
import User from '../models/User';
import comparePassword from '../helpers/comparePassword';
import bcrypt from 'bcryptjs';

const registerUser = async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            username,
            email,
            password,
        });

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await <any>User.findOne({ username }).select("+password");

        if (user && (await bcrypt.compare(password, user.password))) {
            createToken(user._id, res);

            return res.status(200).json(true);
        }

        return res.status(400).json({
            success: false,
            message: "Incorrect username or password",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }



}

const logoutUser = async (req: Request, res: Response) => {
    console.log("sdas")
}


export { loginUser, registerUser, logoutUser };


