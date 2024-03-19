import { Router } from 'express';
import questionController from './questions.controller.js';
import {
  isAuthenticate,
  isAdmin,
} from '../common/middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, isAdmin, questionController.create);
router.get('/', isAuthenticate, questionController.findAll);
router.put('/:id', isAuthenticate, isAdmin, questionController.update);
router.delete('/:id', isAuthenticate, isAdmin, questionController.remove);

export default router;
