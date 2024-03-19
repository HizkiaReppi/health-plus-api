import { Router } from 'express';
import assesmentController from './assesment.controller.js';
import { isAuthenticate } from '../common/middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, assesmentController.create);
router.get('/', isAuthenticate, assesmentController.findDetailByUserId);
router.get('/all', isAuthenticate, assesmentController.findAllByUserId);
router.delete('/:id', isAuthenticate, assesmentController.destroy);

export default router;
