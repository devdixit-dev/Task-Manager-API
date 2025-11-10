import Joi from "joi";

export const authRegisterSchema = Joi.object({
  fullname: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have at least 3 characters",
    "string:max": "Name should not exceed 30 characters"
  }),
  companyName: Joi.string().min(4).max(40).required().messages({
    "string.min": "Company name should have at least 4 characters",
    "string.max": "Company name should not exceed 24 characters"
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required"
  }),
  contactNumber: Joi.number().min(10).required().messages({
    "string.min": "Contact number should have at least 10 numbers"
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should have at least 8 characters"
  })
});

export const authVerify = Joi.object({
  otp: Joi.string().trim().min(6).required().messages({
    "string.min": "Verification OTP should have at least 6 characters"
  })
});

export const authLogin = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should have at least 8 characters"
  }),
  role: Joi.string().required()
});