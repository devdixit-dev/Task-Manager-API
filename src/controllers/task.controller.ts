import { Request, Response } from "express";
import Task from "../models/task.model";

export const AddTask = async (req: Request, res: Response) => {
  try {
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
  catch (err) {
    console.log(`Error in adding task - ${err}`)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const GetMyTasks = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const allTasks = await Task.find({ assign_to: user._id });

    return res.status(200).json({
      success: true,
      message: `Total Tasks - ${allTasks.length}`,
      allTasks
    });
  }
  catch (err) {
    console.log(`Error in getting my tasks - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const UpdateTaskStatus = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { status } = req.body;

    const taskId = req.params.id;
    if (!taskId) {
      return res.status(404).json({
        success: false,
        message: 'Task ID not found or invalid'
      });
    }

    const updateStatusField: Record<string, any> = {}

    if (status === 'completed') {
      const date = new Date();
      updateStatusField.status = 'completed',
      updateStatusField.done_at = date
    }
    else {
      updateStatusField.status = status,
      updateStatusField.done_at = null;
    }

    const findTask = await Task.findOneAndUpdate(
      { _id: taskId, assign_to: user._id },
      updateStatusField,
      { new: true }
    );
    if (!findTask) {
      return res.status(404).json({
        success: false,
        message: 'Task id is invalid or this task is not assigned to you'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task status changed'
    });
  }
  catch (err) {
    console.log(`Error in update task status - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const UpdateTask = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { title, desc, status, urgency, assign_to } = req.body;

    const taskId = req.params.id;
    if (!taskId) {
      return res.status(404).json({
        success: false,
        message: 'Task ID not found'
      });
    }

    const updateFields: Record<string, any> = {};

    if (title) updateFields.title = title;
    if (desc) updateFields.update = desc;
    if (status) updateFields.status = status;
    if (urgency) updateFields.urgency = urgency;
    if (assign_to) updateFields.assign_to = assign_to;

    const givenTask = await Task.findOneAndUpdate(
      { _id: taskId, owner: user._id },
      updateFields,
      { new: true }
    );

    if(!givenTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
 
    return res.status(200).json({
      success: true,
      message: 'Task info updated',
      updatedTask: givenTask
    });
  }
  catch (err) {
    console.log(`Error in update given task - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const RemoveTask = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const taskId = req.params.id;
    if (!taskId) {
      return res.status(404).json({
        success: false,
        message: 'Invalid task id or removed'
      });
    }

    const findTask = await Task.findOneAndDelete(
      { _id: taskId, owner: user._id }
    );
    if (!findTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task removed'
    });
  }
  catch (err) {
    console.log(`Error in removing task - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}