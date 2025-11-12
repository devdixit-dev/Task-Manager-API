import express from "express";
import { UpdateAvatar, UserProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const UserRoute = express.Router();

UserRoute.get('/profile', UserProfile);

UserRoute.patch('/update-avatar', upload.single('avatar'), UpdateAvatar);

export default UserRoute;