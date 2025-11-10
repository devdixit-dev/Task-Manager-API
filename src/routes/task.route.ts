import express from 'express';

import { Validate } from '../middlewares/validate.middleware';
import { addTaskSchema } from '../validators/task.validator';
import { AddTask, GetMyTasks } from '../controllers/task.controller';

const Task = express.Router();

Task.post('/add-task', Validate(addTaskSchema), AddTask);

Task.get('/my-tasks', GetMyTasks);

export default Task