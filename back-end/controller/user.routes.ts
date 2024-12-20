import { Router, Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Authentication response.
 *         token:
 *           type: string
 *           description: JWT access token.
 *         email:
 *           type: string
 *           format: email
 *         fullname:
 *           type: string
 *           description: Full name.
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           description: User password.
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         profile:
 *           $ref: '#/components/schemas/Profile'  # Fixed missing comma and added `profile` reference
 *     UserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         profile:
 *           $ref: '#/components/schemas/ProfileInput'
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         bio:
 *           type: string
 *         userId:
 *           type: string
 *     ProfileInput:
 *       type: object
 *       properties:
 *         bio:
 *           type: string
 *         userId:
 *           type: string
 *     Role:
 *       type: string
 *       enum: [admin, user]
 */

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
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
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /users/profile/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a profile by user ID
 *     tags: [Users]
 *     description: Retrieve a single profile by their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

userRouter.get('/profile/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getProfileByUserId({ userId });
        res.status(200).json(user);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by email
 *     tags: [Users]
 *     description: Retrieve a single user by their email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail({ email });
        res.status(200).json(user);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user object.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
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
 *      summary: Login using username/password. Returns an with JWT token and user name when successful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
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
export default userRouter;
