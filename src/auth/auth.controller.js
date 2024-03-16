import authService from './auth.service.js';
import Response from '../common/utils/Response.js';
import logger from '../common/utils/logging.js';

const response = new Response();

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    logger.info(`User has been registered successfully: ${result.id}`);

    res.status(201).json(
      response.success({
        code: 201,
        message: 'User has been created successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    logger.info(`User has been logged in successfully: ${result.id}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'User has been logged in successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { register, login };
