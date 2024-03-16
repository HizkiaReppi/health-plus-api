import config from '../config/config.js';
import prisma from './database.js';
import { generateToken as generateJwtToken } from './jwt.js';
import { hash } from './hashing.js';

/**
 * Update the refresh token of the user
 *
 * @param {uuid} userId
 * @param {string} refreshToken
 * @return {Promise}
 */
export const updateRefreshToken = async (userId, refreshToken) => {
  const hashedRefreshToken = await hash(refreshToken);

  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: hashedRefreshToken },
  });
};

/**
 * Update the last login date of the user
 *
 * @param {uuid} userId
 * @return {Promise}
 */
export const updateLastLogin = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { lastLogin: new Date() },
  });
};

/**
 * Generate access and refresh token
 *
 * @param {object} data
 * @return {Promise<Object>}
 * @property {string} accessToken
 * @property {string} refreshToken
 */
export const generateToken = async (data) => {
  const accessToken = generateJwtToken(
    { ...data },
    { expiresIn: config.jwt.expiresIn },
  );
  const refreshToken = generateJwtToken(
    { ...data },
    { expiresIn: config.jwt.refreshIn },
  );

  return { accessToken, refreshToken };
};
