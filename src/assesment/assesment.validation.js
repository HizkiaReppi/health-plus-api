import Joi from 'joi';

export const createAssesmentSchema = Joi.object({
  userId: Joi.string().required(),
  makanan: Joi.array().items(Joi.number().min(1).max(5)).required(),
  aktivitas: Joi.array().items(Joi.number().min(1).max(5)).required(),
  mental: Joi.array().items(Joi.number().min(1).max(5)).required(),
});

export const findAssessmentByUserIdSchema = Joi.string().required();

export const findAllAssessmentSchema = Joi.object({
  userId: Joi.string().required(),
  limit: Joi.number().required(),
  page: Joi.number().required(),
});

export const deleteAssessmentSchema = Joi.string().required();
