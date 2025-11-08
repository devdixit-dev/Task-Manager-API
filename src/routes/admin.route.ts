import express from 'express';

import { AddUser } from '../controllers/admin.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const Admin = express.Router();

Admin.post('/add-user', isAuthenticated, AddUser);

export default Admin