import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import IUser from '../interfaces/IUser';


const createToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    return res.status(200).cookie('access_token', token, options)

}

const isTokenIncluded = (req: Request) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:')
}

const getAccessTokenFromHeader = (req: Request) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(' ')[1];
    return access_token;
}

export { isTokenIncluded, getAccessTokenFromHeader, createToken }