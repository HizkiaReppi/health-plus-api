import { Router } from 'express';
import usersController from './users.controller.js';
import {
  isAuthenticate,
  isAdmin,
} from '../common/middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, isAdmin, usersController.create);
router.get('/', isAuthenticate, usersController.findAll);
router.get('/:id', isAuthenticate, usersController.findById);

export default router;
