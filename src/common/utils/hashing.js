import bcrypt from 'bcrypt';
import config from '../config/config.js';

export const hash = async (data) => {
  const salt = await bcrypt.genSalt(+config.bcrypt.saltRounds);
  return bcrypt.hash(data, salt);
};

export const compare = async (data, hash) => {
  return bcrypt.compare(data, hash);
};
