import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import User from "../models/user.model";
import sendMail from "../services/mailer.service";

export const AddUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { fullname, email, contactNumber, role } = req.body;

    const hashPass = await bcrypt.hash(`${contactNumber}`, 12);

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
        password: ${newone.contactNumber}
        `
      )
    }, 2000);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newone
    });
  }
  catch (err) {
    console.log(`Error in adding user - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const AllUsers = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const allUsers = await User.find({
      companyName: user.companyName,
      role: 'Employee'
    })
      .lean();

    return res.status(200).json({
      success: true,
      message: `Total Users - ${allUsers.length}`,
      users: allUsers
    });
  }
  catch (err) {
    console.log(`Error in getting all users - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const UpdateData = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    if(!id) {
      return res.status(404).json({
        success: false,
        message: 'ID not found in params'
      });
    }

    const { fullname, email, contactNumber, password } = req.body;
    const hashPass = await bcrypt.hash(password, 12);

    const updateUserData = await User.findByIdAndUpdate(
      id,
      { fullname, email, contactNumber, password: hashPass }
    ).select('+password');

    setTimeout(async () => {
      await sendMail(
        email,
        `Task Manager API - Update User Info`,
        `Your information is just updated by your admin ${(req as any).user.fullname}.
        \n
        your old email: ${email}, your new email: ${updateUserData?.email}
        `
      );
    }, 2000);

    return res.status(200).json({
      success: true,
      message: "User data updated successfully"
    });
  }
  catch (err) {
    console.log(`Error in updating user data - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const DeleteUser = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    if(!id) {
      return res.status(404).json({
        success: false,
        message: 'ID not found in params'
      });
    }

    await User.findByIdAndUpdate(
      id,
      { isActive: false }
    );

    return res.status(200).json({
      success: true,
      message: 'User removed successfully'
    });
  }
  catch (err) {
    console.log(`Error in deleting user - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}