import express from 'express';

import { AddUser, AllUsers, DeleteUser, UpdateData } from '../controllers/admin.controller';

const Admin = express.Router();

Admin.post('/add-user', AddUser);

Admin.get('/all-users', AllUsers);

Admin.put('/update-user/:id', UpdateData);

Admin.post('/remove-user/:id', DeleteUser);

export default Admin