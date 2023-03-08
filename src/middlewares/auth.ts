import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getAccessTokenFromHeader, isTokenIncluded } from '../helpers/authHelpers';
import User from '../models/User';

const getAccessToRoute = async(req:Request, res:Response, next:NextFunction) => {

    if (!isTokenIncluded(req)) {
      
      return res.status(401).json({
        success: false,
        message: "Token invalid or not found"
        });
    }
  
    const access_token = getAccessTokenFromHeader(req);


    jwt.verify(access_token, process.env.JWT_SECRET_KEY, async(err, decoded) => {
      if (err) {
        res.locals.user = null;
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
      } else{
        (<any>req).user = {
          id: (<any>decoded).id,
          name: (<any>decoded).name,
        };
        // if you use local variables, you can use res.locals.user = user;
        let user = await User.findById((<any>decoded).id);
        res.locals.user = user;
        next();
      }
      
    });
  };
  

export { getAccessToRoute };