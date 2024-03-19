import questionService from './questions.service.js';
import Response from '../common/utils/Response.js';
import logger from '../common/utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const result = await questionService.create(req.body);

    logger.info(`Question with id ${result.id} has been created successfully`);

    res.status(201).json(
      response.success({
        code: 201,
        message: 'Question has been created successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const limit = +req.query.limit || 10;
    const page = +req.query.page || 1;

    const { results, totalData } = await questionService.findAll(limit, page);

    logger.info('Questions has been retrieved successfully');

    res.status(200).json(
      response.getDataWithPagination({
        code: 200,
        message: 'Questions has been retrieved successfully',
        data: results,
        totalData,
        totalPage: Math.ceil(totalData / limit),
        limit: limit,
        page: page,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await questionService.update(id, req.body);

    logger.info(`Question with id ${id} has been updated successfully`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Question has been updated successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await questionService.remove(id);

    logger.info(`Question with id ${id} has been deleted successfully`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Question has been deleted successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  findAll,
  update,
  remove,
};
