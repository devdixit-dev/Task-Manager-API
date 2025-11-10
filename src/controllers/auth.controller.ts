import { Request, Response } from "express";
import bcrypt from 'bcrypt'

import sendMail from "../services/mailer.service";
import redisClient from "../configs/redis.config";
import User from "../models/user.model";
import { signJWT } from "../services/jwt.service";

export const CompanyRegister = async (req: Request, res: Response) => {
  try {
    const {
      fullname, companyName, email,
      contactNumber, password
    } = req.body;

    const user = await User.findOne({ email });
    if (user && user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User already exist'
      });
    }

    // hash pass
    const hashPassword = await bcrypt.hash(password, 12);

    // gen otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    const newone = await User.create({
      fullname, companyName, email, contactNumber, 
      password: hashPassword, role: 'Admin'
    });

    setTimeout(async () => {
      // send otp to email
      await sendMail(
        newone.email,
        `Task Manager API Verification`,
        `Hello, We welcome you to Task Manager API as an Admin User.
        Your verification OTP is ${otp} associated with email ${newone.email}.`
      );
    }, 2000);

    // add user id in cookies
    res.cookie('v_token', newone._id, {
      maxAge: 5 * 60 * 1000
    });

    // add user id in redis - expiry in 5 min
    await redisClient.set(`${newone._id}`, `${otp}`, { EX: 300 });
    
    return res.status(201).json({
      success: true,
      message: `We sent you the verification otp on your email ${newone.email} to verify your account.`
    });
  }
  catch (error) {
    console.log(`Error in company register - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const CompanyVerification = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const token = req.cookies.v_token

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'Token not provided. please make account again or contact admin'
      });
    }

    const user = await User.findById(token).select('-password').lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid token or user not found'
      });
    }

    const getOtp = await redisClient.get(`${user._id}`);

    if (getOtp !== String(otp)) {
      return res.status(403).json({
        success: false,
        message: 'Incorrect verification OTP'
      });
    }

    const verified = await User.findByIdAndUpdate(
      user._id,
      { isVerified: true, verificationOTP: null, isActive: true },
      { new: true }
    ).lean();

    setTimeout(async () => {
      // send otp to email
      await sendMail(
        user.email,
        `Task Manager API Verification`,
        `Hello, We welcome you to Task Manager API.
        Your verification is done. associated with email ${user.email}.`
      );
    }, 2000);

    res.clearCookie('v_token');

    return res.status(200).json({
      success: true,
      message: 'Your account is verified. You can login now.',
      verified: verified?.isVerified
    });
  }
  catch (error) {
    console.log(`Error in company verification - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email }).select('+password').lean();
    if(!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Conact your admin'
      });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if(!matchPass || role !== user.role) {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials or role'
      });
    }

    const payload = {
      id: user._id,
      company: user.companyName,
      role: user.role
    }

    const token = signJWT(payload);

    res.cookie('a_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully'
    })
  }
  catch (error) {
    console.log(`Error in company login - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const Logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('a_token', {
      httpOnly: true,
      sameSite: 'lax'
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  }
  catch (error) {
    console.log(`Error in logout - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}