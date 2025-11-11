import express from "express";

import { CompanyRegister, CompanyVerification, Login, Logout, ResetPassword } from "../controllers/auth.controller";
import { Validate } from "../middlewares/validate.middleware";
import { authLogin, authRegisterSchema, authVerify } from "../validators/auth.validator";
import { isAuthenticated } from "../middlewares/auth.middleware";

const AuthRoute = express();

AuthRoute.post('/register', Validate(authRegisterSchema), CompanyRegister);

AuthRoute.put('/verify', Validate(authVerify), CompanyVerification);

AuthRoute.post('/login', Validate(authLogin), Login);

AuthRoute.post('/logout', isAuthenticated, Logout);

AuthRoute.put('/reset-password', isAuthenticated, ResetPassword);

export default AuthRoute;