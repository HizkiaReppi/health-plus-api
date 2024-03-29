import { Router } from 'express';
import usersRoutes from './users/users.route.js';
import authRoutes from './auth/auth.route.js';
import assesmentRoutes from './assesment/assesment.route.js';
import questionsRoutes from './questions/questions.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/assesment', assesmentRoutes);
router.use('/questions', questionsRoutes);

export default router;
