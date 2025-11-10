import { Request, Response } from "express";
import Task from "../models/task.model";

export const AddTask = async (req: Request, res: Response) => {
  try{
    const user = (req as any).user;

    const { title, desc, status, urgency, assign_to } = req.body;

    const task = await Task.create({
      company: user.companyName,
      title, desc, status, urgency, assign_to,
      owner: user._id,
    });

    return res.status(200).json({
      success: true,
      message: 'Task added',
      task
    });
  }
  catch(err) {
    console.log(`Error in adding task - ${err}`)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const GetMyTasks = async (req: Request, res: Response) => {
  try{
    const user = (req as any).user;

    const allTasks = await Task.find({ assign_to: user._id });

    return res.status(200).json({
      success: true,
      message: `Total Tasks - ${allTasks.length}`,
      allTasks
    });
  }
  catch(err) {
    console.log(`Error in getting my tasks - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}