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
 *           description: Unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         balance:
 *           type: number
 *           description: The user's balance.
 *         library:
 *           type: object
 *           description: The user's library object.
 *           additionalProperties: true
 *         profile:
 *           type: object
 *           description: The user's profile object.
 *           additionalProperties: true
 *         purchases:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Purchase'
 *           description: List of the user's purchases.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: "Invalid `id` parameter" });
        }

        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *               balance:
 *                 type: number
 *                 description: The user's initial balance.
 *               library:
 *                 type: object
 *                 description: The library object for the user.
 *                 additionalProperties: true
 *               profile:
 *                 type: object
 *                 description: The profile object for the user.
 *                 additionalProperties: true
 *               purchases:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Purchase'
 *                 description: Initial purchases array for the user.
 *     responses:
 *       201:
 *         description: The user was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, balance, library, profile } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Missing username" });
        }

        if (!password) {
            return res.status(400).json({ error: "Missing password" });
        }

        if (!balance || isNaN(balance)) {
            return res.status(400).json({ error: "Invalid balance" });
        }

        if (!library) {
            return res.status(400).json({ error: "Missing library" });
        }

        if (!profile) {
            return res.status(400).json({ error: "Missing profile" });
        }

        const user = userService.newUser(username, password, library, profile, balance);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
