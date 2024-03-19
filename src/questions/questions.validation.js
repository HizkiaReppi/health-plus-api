import Joi from 'joi';

export const createQuestionSchema = Joi.object({
  question: Joi.string().required(),
  category: Joi.string()
    .valid('DIET', 'PHYSICAL_ACTIVITY', 'MENTAL_HEALTH')
    .required(),
  options: Joi.array().required(),
});

export const getQuestionsSchema = Joi.object({
  limit: Joi.number().required(),
  page: Joi.number().required(),
});

export const updateQuestionSchema = Joi.object({
  id: Joi.string().required(),
  question: Joi.string(),
  category: Joi.string().valid('DIET', 'PHYSICAL_ACTIVITY', 'MENTAL_HEALTH'),
  options: Joi.array(),
});

export const deleteQuestionSchema = Joi.string().required();
