// Modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    }
    (<any>req).user = {
      _id: (<any>decoded).userId,
    };

    next();
  });
};

// This function creates a token and sends it to the client
const createToken = (user: any, res: Response) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE, JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;


  const payload = {
    id: user._id,
    name: user.name
  }
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE
  })

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
    secure: NODE_ENV === "development" ? false : true,
  }

  return res.status(200).cookie('access_token', token, options).json({
    success: true,
    access_token: token,
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
    }
  });

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