// Modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Models
import User from '../models/User';

//? This is the middleware that checks if the user is logged in or not
const getAccessToRoute = async (req: Request, res: Response, next: NextFunction) => {

  if (!isTokenIncluded(req)) {

    return res.status(401).json({
      success: false,
      message: "Token invalid or not found"
    });
  }

  const access_token = getAccessTokenFromHeader(req);

  jwt.verify(access_token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.locals.user = null;
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    } else {
      (<any>req).user = {
        id: (<any>decoded).id,
        name: (<any>decoded).name,
      };
      // if you use local variables, you can use res.locals;
      res.locals.user = await User.findById((<any>decoded).id);
      next();
    }

  });
};

// This function creates a token and sends it to the client
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

// This function checks if the token is included in the request
const isTokenIncluded = (req: Request) => {
  return req.headers.authorization && req.headers.authorization.startsWith('Bearer:')
}

// This function gets the token from the request
const getAccessTokenFromHeader = (req: Request) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(' ')[1];
  return access_token;
}


export { getAccessToRoute, createToken };