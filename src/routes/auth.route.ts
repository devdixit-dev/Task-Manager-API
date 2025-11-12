import express from "express";

import { CompanyRegister, CompanyVerification, Login, Logout, ResetPassword } from "../controllers/auth.controller.js";
import { Validate } from "../middlewares/validate.middleware.js";
import { authLogin, authRegisterSchema, authVerify } from "../validators/auth.validator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const AuthRoute = express();

AuthRoute.get('/check', (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

AuthRoute.post('/register', Validate(authRegisterSchema), CompanyRegister);

AuthRoute.put('/verify', Validate(authVerify), CompanyVerification);

AuthRoute.post('/login', Validate(authLogin), Login);

AuthRoute.post('/logout', isAuthenticated, Logout);

AuthRoute.put('/reset-password', isAuthenticated, ResetPassword);

export default AuthRoute;