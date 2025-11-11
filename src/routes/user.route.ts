import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UpdateAvatar, UserProfile } from "../controllers/user.controller";
import upload from "../middlewares/multer.middleware";

const UserRoute = express.Router();

UserRoute.get('/profile', UserProfile);

UserRoute.patch('/update-avatar', upload.single('avatar'), UpdateAvatar);

export default UserRoute;