import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/User.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         email:
 *           type: string
 *         permission:
 *           type: string
 *           enum: [ADMIN, USER, GUEST]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               permission:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - name
 *               - surname
 *               - email
 *               - permission
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput: UserInput = req.body;
    const newUser = await userService.createUser(userInput);
    res.status(201).json(newUser);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('required')) {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export { userRouter };