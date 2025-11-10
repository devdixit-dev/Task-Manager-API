import express from "express";

import { CompanyRegister, CompanyVerification, Login, Logout, ResetPassword } from "../controllers/auth.controller";
import { Validate } from "../middlewares/validate.middleware";
import { authLogin, authRegisterSchema, authVerify } from "../validators/auth.validator";
import { isAuthenticated } from "../middlewares/auth.middleware";

const Auth = express();

Auth.post('/register', Validate(authRegisterSchema), CompanyRegister);

Auth.put('/verify', Validate(authVerify), CompanyVerification);

Auth.post('/login', Validate(authLogin), Login);

Auth.post('/logout', isAuthenticated, Logout);

Auth.put('/reset-password', isAuthenticated, ResetPassword);

export default Auth;