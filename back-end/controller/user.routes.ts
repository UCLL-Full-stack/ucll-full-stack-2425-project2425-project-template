/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         firstName:
 *           type: string
 *           description: User's first name.
 *         lastName:
 *           type: string
 *           description: User's last name.
 *         email:
 *           type: string
 *           description: User's email.
 *         password:
 *           type: string
 *           description: User's password.
 *         role:
 *           type: string
 *           description: User role.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     description: Returns a JSON array of all users. Each user object contains an ID, name, and role.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
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
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     description: Returns a JSON object of the user with the specified ID. If the user does not exist, an error is thrown.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: number
 *           format: int64
 *     responses:
 *       200:
 *         description: The user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        if ((error as Error).message.includes('does not exist')) {
            return res.status(404).json({ message: (error as Error).message });
        }
        next(error); // For other errors
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Creates a new user with the provided data.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User first name.
 *               lastName:
 *                 type: string
 *                 description: User last name.
 *               email:
 *                 type: string
 *                 description: User email.
 *               password:
 *                 type: string
 *                 description: User password.
 *               role:
 *                 type: string
 *                 description: User role.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Create a user using the service
        const newUser = userService.createUser({ firstName, lastName, email, password, role });

        // Respond with the newly created user
        return res.status(201).json(newUser);
    } catch (error) {
        // Handle specific error types
        if ((error as Error).message.includes('already exists')) {
            return res.status(409).json({ message: 'User already exists.' });// Conflict error for duplicate users
        } else if ((error as Error).message.includes('required')) {
            return res.status(400).json({ message: (error as Error).message }); // Bad request for validation issues
        } else if ((error as Error).message.includes('Validation error')) {
            return res.status(422).json({ message: (error as Error).message }); // Unprocessable entity for validation errors
        }

        // For any other unexpected error, pass it to the next middleware
        console.error('Unexpected error:', error);
        return next(error);
    }
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user.
 *     description: Logs in a user with their email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const isValidUser = await userService.verifyUserCredentials(email, password);

        if (isValidUser) {
            return res.status(200).json({ message: 'Login successful.' });
        }

        return res.status(401).json({ message: 'Invalid email or password.' });
    } catch (error) {
        console.error('Error logging in:', error);
        next(error); // Pass to the next error handler
    }
});


export { userRouter };
