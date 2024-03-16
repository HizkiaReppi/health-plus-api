import { Router } from 'express';
import usersRoutes from './users/users.route.js';
import authRoutes from './auth/auth.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;
