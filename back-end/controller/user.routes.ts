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
import { UserInput } from '../types/index';

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

export { userRouter };
