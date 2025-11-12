import { Request, Response } from "express";

import Task from "../models/task.model.js";

export const AddComment = async (req: Request, res: Response) => {
  try{
    const user = (req as any).user;

    const { comment } = req.body;
    
    const taskId = req.params.id;
    if(!taskId) {
      return res.status(404).json({
        success: false,
        message: 'Invalid task id or not found'
      });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { comments: { userId: user._id, comment: comment } },
      { new: true }
    );

    if(!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or already removed by owner'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Comment added'
    });
  }
  catch(err) {
    console.log(`Error in adding comment - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}