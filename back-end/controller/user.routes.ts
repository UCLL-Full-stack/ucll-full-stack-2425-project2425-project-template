/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *         firstName:
 *           type: string
 *           description: First name.
 *         lastName:
 *           type: string
 *           description: Last name.
 *         email:
 *           type: string
 *           description: E-mail.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Authentication response.
 *         token:
 *           type: string
 *           description: JWT access token.
 *         username:
 *           type: string
 *           description: User name.
 *         fullname:
 *           type: string
 *           description: Full name.
 *         id:
 *           type: number
 *           format: int64
 *           descripion: userId
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *         firstName:
 *           type: string
 *           description: First name.
 *         lastName:
 *           type: string
 *           description: Last name.
 *         email:
 *           type: string
 *           description: E-mail.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum:
 *         - admin
 *         - user
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { SubscriptionInput, SubscriptionType, UserInput } from '../types/index';

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
    async (req: Request, res: Response, next: NextFunction) => {
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
 *         description: The user has been created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using username/password. Returns an object with JWT token and user name when successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: changes subscription of use.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/subscription', async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received body:", req.body);  

    const { subscription, userId } = req.body;
    const { type, startDate, duration } = subscription;

    try {
        if (!type || !startDate || !duration || !userId) {
            return res.status(400).json({ message: 'Missing required fields.' }); 
        }
        const subscriptionInput: SubscriptionInput = {
            type,
            start_date: startDate,
            duration,
        };
        const updatedUser = await userService.changeSubscriptionOfUser(subscriptionInput, userId);

        res.status(200).json({ message: 'Subscription updated successfully.', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in database.' });
    }
});



export { userRouter };
   

