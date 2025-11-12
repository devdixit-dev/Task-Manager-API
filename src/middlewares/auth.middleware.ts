import { Request, Response, NextFunction } from "express";

import { verifyJWT } from "../services/jwt.service";
import User from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.cookies.a_token;
    if(!token) {
      return res.status(403).json({
        success: false,
        message: 'Token not provided'
      });
    }

    const decoded = verifyJWT(token);
    if(!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token invalid or expired'
      });
    }
    
    const userId = (decoded as JwtPayload).id;
    const user = await User.findById(userId).lean();
    if(!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Contact your admin'
      });
    }

    (req as any).user = user;
    next();
  }
  catch(err) {
    console.log(`Error in auth middleware - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user = (req as any).user;

    if(user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed for this route'
      });
    }

    next();
  }
  catch(err) {
    console.log(`Error in admin middleware - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}