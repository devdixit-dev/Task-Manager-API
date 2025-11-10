import Joi from "joi";

export const addTaskSchema = Joi.object({
  title: Joi.string().min(4).max(40).required().messages({
    "string:empty": "Task title is required",
    "string:min": "Task title have at least 4 characters",
    "string:max": "Task title should not exceed 40 characters"
  }),
  desc: Joi.string().min(4).max(250).required().messages({
    "string:empty": "Task description is required",
    "string:min": "Task description have at least 4 characters",
    "string:max": "Task description should not exceed 250 characters"
  }),
  status: Joi.string(),
  urgency: Joi.string(),
  assign_to: Joi.string(),
  comments: {
    id: Joi.string(),
    comment: Joi.string().min(2).max(300).messages({
      "string:min": "Task comment have at least 4 characters",
      "string:max": "Task comment should not exceed 250 characters"
    })
  }
});