import express from 'express';

import { AddUser, AllUsers } from '../controllers/admin.controller';

const Admin = express.Router();

Admin.post('/add-user', AddUser);

Admin.get('/all-users', AllUsers);

export default Admin