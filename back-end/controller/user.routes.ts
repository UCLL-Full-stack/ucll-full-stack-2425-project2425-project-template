/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Competition:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: Competition name.
 *      UserInput:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - role
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
const userRouter = express.Router();


/**
 * @swagger
 * /user:
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
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById({ id: Number(req.params.id) });
        if (!user) {
            return res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Invalid request' });
    }
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'fout met aanmaken user' });
    }
});

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       400:
 *         description: Error creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
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
 * /user/login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: MySecretPassword123
 *     responses:
 *       200:
 *         description: User authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.authenticate(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
