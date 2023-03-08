import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const sendJwtToClient = async(user: any, res: Response) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
    }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });

    return res.status(200).json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            username: user.username,
            email: user.email,
        }
    });
}

const isTokenIncluded = (req: Request) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
}