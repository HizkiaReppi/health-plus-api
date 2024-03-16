import { loginSchema } from './auth.validation.js';
import { createUserSchema } from '../users/users.validation.js';
import { hash, compare } from '../common/utils/hashing.js';
import {
  generateToken,
  updateLastLogin,
  updateRefreshToken,
} from '../common/utils/auth.js';
import validate from '../common/utils/validation.js';
import ResponseError from '../common/errors/ResponseError.js';
import NotFoundError from '../common/errors/NotFoundError.js';
import usersService from '../users/users.service.js';

const register = async (payload) => {
  const data = await validate(createUserSchema, payload);

  const isEmailExists = await usersService.findByEmail(data.email);
  if (isEmailExists) throw new ResponseError(400, 'Email already exists');

  data.password = await hash(data.password);

  const user = await usersService.create(data);

  const { accessToken, refreshToken } = await generateToken(user);
  await updateRefreshToken(user.id, refreshToken);
  await updateLastLogin(user.id);

  return { accessToken, refreshToken };
};

const login = async (payload) => {
  const data = await validate(loginSchema, payload);

  const user = await usersService.findByEmail(data.email);
  if (!user) throw new NotFoundError(404, 'Email or password is incorrect');

  const isPasswordMatch = await compare(data.password, user.password);
  if (!isPasswordMatch) {
    throw new ResponseError(400, 'Email or password is incorrect');
  }

  const { accessToken, refreshToken } = await generateToken(user);
  await updateRefreshToken(user.id, 'refreshToken');
  await updateLastLogin(user.id);

  return { accessToken, refreshToken };
};

export default { register, login };
