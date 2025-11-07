import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../services/jwt.service";
import User from "../models/user.model";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
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
  }
  catch(err) {
    console.log(`Error in auth middleware - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}