import { Router } from 'express';
import usersController from './users.controller.js';

const router = Router();

router.post('/', usersController.create);
router.get('/', usersController.findAll);
router.get('/:id', usersController.findById);

export default router;
