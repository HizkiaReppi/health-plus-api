import {
  createUserSchema,
  getAllUserSchema,
  getUserByEmailSchema,
  getUserByIdSchema,
} from './users.validation.js';
import { hash } from '../common/utils/hashing.js';
import validate from '../common/utils/validation.js';
import prisma from '../common/utils/database.js';
import ResponseError from '../common/errors/ResponseError.js';

const create = async (payload) => {
  const data = await validate(createUserSchema, payload);
  const hashedPassword = await hash(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

const findAll = async (limit, page) => {
  const data = await validate(getAllUserSchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const users = await prisma.user.findMany({
    skip,
    take: data.limit,
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!users || users.length < 1) {
    throw new ResponseError('Users not found', 404);
  }

  return users;
};

const findByEmail = async (email) => {
  const data = await validate(getUserByEmailSchema, { email });

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: data.email },
  });

  return user;
};

const findById = async (id) => {
  const data = await validate(getUserByIdSchema, { id });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: data.id },
  });

  return user;
};

const count = async () => {
  const count = await prisma.user.count();
  return count;
};

export default { create, findAll, findByEmail, findById, count };
