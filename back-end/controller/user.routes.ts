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
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
const userRouter = express.Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get a list of all Competitions.
 *     responses:
 *       200:
 *         description: A list of Competitions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Competition'
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
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'fout met aanmaken user' });
    }
});

userRouter.get('/name/:name', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserByName({ name: req.params.name });
        if (!user) {
            return res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by name:', error);
        res.status(500).json({ status: 'error', errorMessage: 'Unable to fetch user by name' });
    }
});

export default userRouter;
