import { Router } from 'express';
import usersController from './users.controller.js';
import {
  isAuthenticate,
  isAdmin,
} from '../common/middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - name
 *         - email
 *         - password
 *     GetAllUsersQuery:
 *       type: object
 *       properties:
 *         limit:
 *           type: number
 *         page:
 *           type: number
 *     CreateDataResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         code:
 *           type: number
 *           example: 201
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             createdAt:
 *               type: string
 *     GetAllDataResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         code:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              createdAt:
 *                type: string
 *              updatedAt:
 *                type: string
 *         meta:
 *           type: object
 *           properties:
 *             totalData:
 *               type: number
 *             totalPage:
 *               type: number
 *             page:
 *               type: number
 *             limit:
 *               type: number
 *     GetDetailDataResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         code:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *             lastLogin:
 *               type: string
 *             refreshToken:
 *               type: string
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Allows only authenticated admin users to create a new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDataResponse'
 *       '401':
 *         description: Unauthorized request
 *       '403':
 *         description: Forbidden request, user does not have permission
 *
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Allows only authenticated users to retrieve all users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllDataResponse'
 *       '401':
 *         description: Unauthorized request
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Allows only authenticated users to retrieve a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetDetailDataResponse'
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: User not found
 */

router.post('/', isAuthenticate, isAdmin, usersController.create);
router.get('/', isAuthenticate, usersController.findAll);
router.get('/:id', isAuthenticate, usersController.findById);

export default router;
