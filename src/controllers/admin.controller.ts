import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import User from "../models/user.model.js";
import sendMail from "../services/mailer.service.js";
import Task from "../models/task.model.js";

export const AddUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { fullname, email, password, contactNumber, role } = req.body;

    const findUser = await User.findOne({ email });
    if(findUser) {
      return res.status(401).json({
        success: false,
        message: 'User already exist'
      });
    }

    const hashPass = await bcrypt.hash(password, 12);

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
        Password: ${password}
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
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: 'ID not found in params'
      });
    }

    const { fullname, email, contactNumber, password } = req.body;

    const user = await User.findById(id).select('+password');
    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid user id or user not found'
      });
    }

    const updateFields: Record<string, any> = {};

    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (contactNumber) updateFields.contactNumber = contactNumber;
    if (password) {
      updateFields.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateFields,
      { new: true },
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'User data updated successfully',
      update: updatedUser
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
  try {
    const id = req.params.id;
    if (!id) {
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

// ALL TASKS

export const GetAllTasks = async (req: Request, res: Response) => {
  try{
    const user = (req as any).user
    const allTasks = await Task.find({ company: user.companyName }).populate('owner assign_to')

    return res.status(200).json({
      success: true,
      message: `Total Tasks - ${allTasks.length}`,
      tasks: allTasks
    })
  }
  catch(err) {
    console.log(`Error in getting all tasks admin - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}