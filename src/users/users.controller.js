import usersService from './users.service.js';
import Response from '../common/utils/Response.js';
import logger from '../common/utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const data = await usersService.create(req.body);

    logger.info(`Data has been created successfully: ${data.id}`);

    res
      .status(201)
      .location(`/users/${data.id}`)
      .json(
        response.success({
          code: 201,
          message: 'Data has been created successfully',
          data,
        }),
      );
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    const data = await usersService.findAll(limit, page);
    const totalData = await usersService.count();

    logger.info('Data has been retrieved successfully');

    res.status(200).json(
      response.getDataWithPagination({
        code: 200,
        message: 'Data has been retrieved successfully',
        data,
        totalData,
        totalPage: Math.ceil(totalData / limit),
        limit,
        page,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await usersService.findById(req.params.id);

    logger.info(`Detail Data has been retrieved successfully: ${data.id}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Data has been retrieved successfully',
        data,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { create, findAll, findById };
