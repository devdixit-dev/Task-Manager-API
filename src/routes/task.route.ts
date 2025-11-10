import express from 'express';

import { Validate } from '../middlewares/validate.middleware';
import { addTaskSchema } from '../validators/task.validator';
import { AddTask, GetMyTasks, RemoveTask, UpdateTask, UpdateTaskStatus } from '../controllers/task.controller';

const Task = express.Router();

Task.post('/add-task', Validate(addTaskSchema), AddTask);

Task.get('/my-tasks', GetMyTasks);

Task.put('/update-task-status/:id', UpdateTaskStatus);

Task.put('/update-task', UpdateTask);

Task.delete('/remove-task', RemoveTask);

export default Task