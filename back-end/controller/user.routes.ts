/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            name:
 *              type: string
 *              description: User name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password..
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [admin, player, coach]
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput, AuthenticationRequest } from '../types/index';


const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get(
    '/',
    async (req: Request & { auth?: UserInput }, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
userRouter.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput: UserInput = req.body;
            const newUser = await userService.createUser(userInput);
            res.status(200).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
userRouter.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, password, role }: AuthenticationRequest = req.body;
            const authResponse = await userService.authenticate(name, password, role);
            res.status(200).json(authResponse);
        } catch (error) {
            next(error);
        }
    }
);

export default userRouter;