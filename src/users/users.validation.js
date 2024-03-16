import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const getAllUserSchema = Joi.object({
  limit: Joi.number().integer().min(1).required(),
  page: Joi.number().integer().min(1).required(),
});

export const getUserByEmailSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
