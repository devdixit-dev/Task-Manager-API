import express from 'express';

import { Validate } from '../middlewares/validate.middleware';
import { addTaskSchema } from '../validators/task.validator';
import { AddTask, GetMyTasks, RemoveTask, UpdateTask, UpdateTaskStatus } from '../controllers/task.controller';

const Task = express.Router();

Task.post('/add', Validate(addTaskSchema), AddTask);

Task.get('/my', GetMyTasks);

Task.put('/update-status/:id', UpdateTaskStatus);

Task.put('/update/:id', UpdateTask);

Task.delete('/remove/:id', RemoveTask);

export default Task