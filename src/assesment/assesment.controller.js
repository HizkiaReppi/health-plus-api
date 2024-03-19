import assesmentService from './assesment.service.js';
import Response from '../common/utils/Response.js';
import logger from '../common/utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const { user } = res.locals;

    const data = {
      ...req.body,
      userId: user.id,
    };

    const result = await assesmentService.create(data);

    logger.info(`User ${user.id} created an assessment with id ${result.id}`);

    res.status(201).json(
      response.success({
        code: 201,
        message: 'Assessment has been created successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findDetailByUserId = async (req, res, next) => {
  try {
    const { user } = res.locals;

    const result = await assesmentService.findDetailByUserId(user.id);

    logger.info(`User ${user.id} retrieved an assessment with id ${result.id}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Assessment has been retrieved successfully',
        data: result,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findAllByUserId = async (req, res, next) => {
  try {
    const { user } = res.locals;

    const payload = {
      limit: +req.query.limit || 10,
      page: +req.query.page || 1,
      userId: user.id,
    };

    const { result, totalData } =
      await assesmentService.findAllByUserId(payload);

    logger.info(`User ${user.id} retrieved all assessments`);

    res.status(200).json(
      response.getDataWithPagination({
        code: 200,
        message: 'Assessment has been retrieved successfully',
        data: result,
        totalData,
        totalPage: Math.ceil(totalData / payload.limit),
        limit: payload.limit,
        page: payload.page,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;

    await assesmentService.destroy(user.id, id);

    logger.info(`User ${user.id} deleted an assessment with id ${id}`);

    res.status(200).json(
      response.noData({
        status: true,
        code: 200,
        message: 'Assessment has been deleted successfully',
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { create, findDetailByUserId, findAllByUserId, destroy };
