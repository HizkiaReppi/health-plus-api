import {
  createQuestionSchema,
  getQuestionsSchema,
  updateQuestionSchema,
} from './questions.validation.js';
import validate from '../common/utils/validation.js';
import prisma from '../common/utils/database.js';
import NotFoundError from '../common/errors/NotFoundError.js';

const create = async (payload) => {
  const data = await validate(createQuestionSchema, payload);

  if (Array.isArray(data.options)) {
    data.options = data.options.join(',');
  }

  const question = await prisma.question.create({
    data: {
      question: data.question,
      category: data.category,
      options: data.options,
    },
  });

  return question;
};

const findAll = async (limit, page) => {
  const data = await validate(getQuestionsSchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const results = await prisma.question.findMany({
    skip,
    take: data.limit,
    orderBy: { category: 'asc' },
  });

  const totalData = await prisma.question.count();

  if (!results || results.length < 1) {
    throw new NotFoundError('Questions not found');
  }

  results.forEach((result) => {
    result.options = result.options.split(',');
  });

  return { results, totalData };
};

const update = async (id, payload) => {
  const data = await validate(updateQuestionSchema, { id, ...payload });

  const isQuestionExist = await prisma.question.findUnique({
    where: { id: data.id },
  });

  if (!isQuestionExist) {
    throw new NotFoundError('Question not found');
  }

  if (Array.isArray(data.questions)) {
    data.questions = data.questions.join(',');
  }

  const question = await prisma.question.update({
    where: { id: data.id },
    data: {
      question: data.question,
      category: data.category,
      options: data.options,
    },
  });

  return question;
};

const remove = async (id) => {
  const question = await prisma.question.delete({
    where: { id },
  });

  return question;
};

export default {
  create,
  findAll,
  update,
  remove,
};
