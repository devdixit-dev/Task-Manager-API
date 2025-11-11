import { Request, Response } from "express";
import User from "../models/user.model";

export const UserProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const findUser = await User.findById(user._id)
    .select('-_id -isVerified -isActive -role -createdAt -updatedAt -__v')
    .lean();

    if(!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile fetched',
      profile: findUser
    });
  }
  catch (err) {
    console.log(`Error fetching user profile - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const UpdateAvatar = async (req: Request, res: Response) => {
  try{
    const file = (req as any)?.file;
    if(!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      (req as any).user._id,
      { avatar: `http://localhost:7070/uploads/user/avatars/${file.filename}` },
      { new: true }
    ).lean();

    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your avatar is updated',
      link: user.avatar
    });
  }
  catch(err) {
    console.log(`Error in changing avatar - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}