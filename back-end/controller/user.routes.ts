/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            firstName:
 *              type: string
 *              description: User firstName.
 *            lastName:
 *              type: string
 *              description: User lastName.
 *            username:
 *              type: string
 *              description: User username.
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User password.
 *      UserInput:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *              description: User firstName.
 *            lastName:
 *              type: string
 *              description: User lastName.
 *            username:
 *              type: string
 *              description: User username.
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User password.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const users = userService.getAllUsers()
    res.status(200).json(users)
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id)
    
    try {
        const user = await userService.getUserById({ id: userId });
        res.status(200).json(user)
    } catch(error) {
        res.status(404).json({ message: `User with id ${userId} does not exist`})
    }
})

/**
 * @swagger
 * /users/{userId}/{playlistId}:
 *   put:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put('/:userId/:playlistId', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId)
    const playlistId = parseInt(req.params.playlistId)

    try {
        const addPlaylistToUser = await userService.addPlaylistToUser({userId: userId, playlistId: playlistId})
        res.status(200).json(addPlaylistToUser)
    } catch(error) {
        next(error)
    }
})

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body
        const user = await userService.createUser(userInput)
        res.status(200).json(user)
    } catch(error) {
        next(error)
    }
})

export { userRouter }