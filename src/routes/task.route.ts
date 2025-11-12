import express from 'express';

import { Validate } from '../middlewares/validate.middleware.js';
import { addTaskSchema } from '../validators/task.validator.js';
import { AddTask, GetMyTasks, RemoveTask, UpdateTask, UpdateTaskStatus } from '../controllers/task.controller.js';

const TaskRoute = express.Router();

TaskRoute.post('/add', Validate(addTaskSchema), AddTask);

TaskRoute.get('/my', GetMyTasks);

TaskRoute.put('/update-status/:id', UpdateTaskStatus);

TaskRoute.put('/update/:id', UpdateTask);

TaskRoute.delete('/remove/:id', RemoveTask);

export default TaskRoute