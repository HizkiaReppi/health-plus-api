import {
  berikanUmpanBalik,
  calculateAssessmentResult,
  calculateAverage,
} from '../common/helpers/assesment.js';
import {
  createAssesmentSchema,
  findAllAssessmentSchema,
  findAssessmentByUserIdSchema,
} from './assesment.validation.js';
import validate from '../common/utils/validation.js';
import prisma from '../common/utils/database.js';
import NotFoundError from '../common/errors/NotFoundError.js';
import AuthorizationError from '../common/errors/AuthorizationError.js';

const create = async (payload) => {
  const data = await validate(createAssesmentSchema, payload);

  const skorMakanan = calculateAverage(data.makanan);
  const skorAktivitas = calculateAverage(data.aktivitas);
  const skorMental = calculateAverage(data.mental);

  const result = calculateAssessmentResult(
    skorMakanan,
    skorAktivitas,
    skorMental,
  );

  const feedback = berikanUmpanBalik(skorMakanan, skorAktivitas, skorMental);

  const assesment = await prisma.assesment.create({
    data: {
      userId: data.userId,
      scoreDiet: skorMakanan,
      scorePhysicalActivity: skorAktivitas,
      scoreMentalHealth: skorMental,
      totalScore: result,
    },
  });

  return { ...assesment, totalScore: result, feedback };
};

const findDetailByUserId = async (userId) => {
  const data = await validate(findAssessmentByUserIdSchema, userId);

  const result = await prisma.assesment.findFirst({
    where: {
      userId: data,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (!result) throw new NotFoundError('User belum melakukan assesment');

  return result;
};

const findAllByUserId = async (payload) => {
  const data = await validate(findAllAssessmentSchema, payload);
  const skip = (data.page - 1) * data.limit;

  const result = await prisma.assesment.findMany({
    where: {
      userId: data.userId,
    },
    skip,
    take: data.limit,
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (!result) throw new NotFoundError('User belum melakukan assesment');

  const totalData = await prisma.assesment.count({
    where: {
      userId: data.userId,
    },
  });

  return { result, totalData };
};

const destroy = async (userId, assesmentId) => {
  const id = await validate(findAssessmentByUserIdSchema, assesmentId);

  const assesment = await prisma.assesment.findFirst({
    where: {
      id,
    },
  });

  if (!assesment) throw new NotFoundError('Assesment tidak ditemukan');
  if (assesment.userId !== userId)
    throw new AuthorizationError(
      'Anda tidak memiliki akses untuk menghapus assesment ini',
    );

  const result = await prisma.assesment.delete({
    where: {
      id,
    },
  });

  return result;
};

export default { create, findDetailByUserId, findAllByUserId, destroy };
