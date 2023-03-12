//? Modules
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

// Models
import User from '../models/User';

//Middlewares
import { createToken } from '../middlewares/auth';

const registerUser = async (req: Request, res: Response) => {

    try {
        const { name, username, email, password } = req.body;
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
            createToken(user, res);
        } else {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.locals.user = null;

        res.status(200).json({
            success: true,
            message: "Logged out",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export { loginUser, registerUser, logoutUser };


