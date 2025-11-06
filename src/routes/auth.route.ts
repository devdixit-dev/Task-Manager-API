import express from "express";

import { CheckAuth, CompanyRegister } from "../controllers/auth.controller";
import { Validate } from "../middlewares/validate.middleware";
import { authRegisterSchema } from "../validators/auth.validator";

const Auth = express();

Auth.get('/check', CheckAuth);

Auth.post('/register', Validate(authRegisterSchema), CompanyRegister);

export default Auth;