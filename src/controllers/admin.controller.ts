import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import User from "../models/user.model";
import sendMail from "../services/mailer.service";

export const AddUser = async (req: Request, res: Response) => {
  try{
    const user = (req as any).user;
    if(user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed for this route'
      });
    }
    
    const { fullname, email, contactNumber, role } = req.body;

    const hashPass = await bcrypt.hash(contactNumber, 12);

    const newone = await User.create({
      fullname, companyName: user.companyName,
      email, contactNumber, password: hashPass,
      role, isVerified: true, isActive: true
    });

    setTimeout(async () => {
      await sendMail(
        newone.email,
        'Your Login Credentials',
        `Welcome to Task Manager API. Your account is created by ${user.fullname}. You can login with the credentials below
        \n
        Email: ${newone.email},
        password: ${contactNumber}
        `
      )
    }, 2000);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newone
    });
  }
  catch(err) {
    console.log(`Error in adding user - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}