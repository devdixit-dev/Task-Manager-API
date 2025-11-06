import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import sendMail from "../services/mailer.service";

export const CheckAuth = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Check auth is working...",
      uptime: process.uptime()
    });
  }
  catch (error) {
    console.log(`Error in check auth - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const CompanyRegister = async (req: Request, res: Response) => {
  try {
    const {
      fullname, companyName, companyEmail,
      companyContactNumber, password
    } = req.body;

    const user = await User.findOne({ companyEmail });
    if (user) {
      if (!user.isActive) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'User already exist'
        });
      }
    }

    // hash pass
    const hashPassword = await bcrypt.hash(password, 12);

    // gen otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    const newone = await User.create({
      fullname, companyName, companyEmail,
      companyContactNumber, password: hashPassword,
      verificationOTP: otp
    });

    setTimeout(async () => {
      // send otp to email
      await sendMail(
        newone.companyEmail,
        `Task Manager API Verification`,
        `Hello, We welcome you to Task Manager API.
      Your verification OTP is ${newone.verificationOTP} associated with email ${newone.companyEmail}.`
      );
    }, 2000);


    // add user id in LS
    localStorage.setItem('v_token', `${newone._id}`);

    return res.status(201).json({
      success: true,
      message: `We sent you the verification otp on your email ${newone.companyEmail} to verify your account.`
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

    const token = localStorage.getItem('v_token');

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'Token not provided. please make account again or contact admin'
      });
    }

    const user = await User.findById(token)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid token or user not found'
      });
    }

    if (user.verificationOTP !== otp) {
      return res.status(403).json({
        success: false,
        message: 'Incorrect verification OTP'
      });
    }

    const verified = await User.findByIdAndUpdate(
      user._id,
      { isVerified: true },
      { new: true }
    ).lean();

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

export const Login = (req: Request, res: Response) => {
  try {

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

  }
  catch (error) {
    console.log(`Error in logout - ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}