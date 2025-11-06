import { Request, Response } from "express";

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

export const CompanyRegister = (req: Request, res: Response) => {
  try {

  }
  catch (error) {
    console.log(`Error in company register - ${error}`);
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

export const CompanyVerification = (req: Request, res: Response) => {
  try {
    
  }
  catch (error) {
    console.log(`Error in company verification - ${error}`);
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