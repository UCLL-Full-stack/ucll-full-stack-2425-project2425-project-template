/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Username.
 *            password:
 *              type: string
 *              description: Password.
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: Username.
 *            password:
 *              type: string
 *              description: Password.
 */
import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using username and password. Returns a JWT token with user name when 200.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const userInput: UserInput = req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(401).json({ status: 'unauthorized', errorMessage });
    }
});

export { userRouter };