/**
 * @swagger
 * components:
 *    securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          nationalRegisterNumber:
 *            type: string
 *          name:
 *            type: string
 *          birthDate:
 *            type: string
 *            format: date
 *          isAdministrator:
 *            type: boolean
 *          phoneNumber:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          accounts:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Account'
 *      UserInput:
 *        type: object
 *        properties:
 *          nationalRegisterNumber:
 *            type: string
 *          name:
 *            type: string
 *          birthDate:
 *            type: string
 *            format: date
 *          isAdministrator:
 *            type: boolean
 *          phoneNumber:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { AccountInput, UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
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
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       400:
 *         description: The user could not be created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.createUser(user);
        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Get a user by email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: The user was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The user could not be retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = userService.getUserByEmailAndPassword(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{nationalRegisterNumber}:
 *   get:
 *     summary: Get a user by national register number
 *     parameters:
 *       - in: path
 *         name: nationalRegisterNumber
 *         required: true
 *         description: The user's national register number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The user could not be retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:nationalRegisterNumber', (req: Request, res: Response, next: NextFunction) => {
    try {
        const nationalRegisterNumber = req.params.nationalRegisterNumber;
        const result = userService.getUserByNationalRegisterNumber(nationalRegisterNumber);
        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{nationalRegisterNumber}/accounts:
 *   post:
 *     summary: Add an account to a user
 *     parameters:
 *       - in: path
 *         name: nationalRegisterNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's national register number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 description: The account number to add
 *     responses:
 *       200:
 *         description: The account was successfully added to the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The account could not be added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post(
    '/:nationalRegisterNumber/accounts',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const nationalRegisterNumber = req.params.nationalRegisterNumber;
            const accountNumber = <string>req.body.accountNumber;
            const result = userService.addAccount(nationalRegisterNumber, accountNumber);
            res.status(200).json(result.toJSON());
        } catch (error: any) {
            next(error);
        }
    }
);

export { userRouter };
