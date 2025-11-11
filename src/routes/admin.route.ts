import express from 'express';

import { AddUser, AllUsers, DeleteUser, GetAllTasks, UpdateData } from '../controllers/admin.controller';

const AdminRoute = express.Router();

AdminRoute.post('/add-user', AddUser);

AdminRoute.get('/all-users', AllUsers);

AdminRoute.put('/update-user/:id', UpdateData);

AdminRoute.post('/remove-user/:id', DeleteUser);

AdminRoute.get('/all-tasks', GetAllTasks);

export default AdminRoute