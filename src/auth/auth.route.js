import { Router } from 'express';
import authController from './auth.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 *
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       required:
 *         - name
 *         - email
 *         - password
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       required:
 *         - email
 *         - password
 *     Response:
 *       type: object
 *       properties:
 *         status:
 *          type: boolean
 *         code:
 *          type: number
 *          example: 200
 *         message:
 *          type: string
 *         data:
 *          type: object
 *          properties:
 *            accessToken:
 *              type: string
 *              description: Access token for user authentication
 *            refreshToken:
 *              type: string
 *              description: Refresh token for user authentication
 *
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Register a new user with provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: Login user with provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
