import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthService from '../service/Auth.Service';
import { UserInput } from '../types';
import UserService from '../service/User.service';

const authRouter = express.Router();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user or admin
 *     tags: [Auth]
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
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: "admin"
 *             password: "Password1"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Missing username, password, or role
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await UserService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response});
    } catch (error) {
        next(error);
    }
});

export { authRouter };