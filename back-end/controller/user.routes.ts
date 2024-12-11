import { Router, Request, Response, NextFunction } from "express";
import userService from "../service/user.service";

const userRouter = Router();

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
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
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
 */

/**
 * @swagger
 * /users:
 *   get:
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
userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
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
userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const userid = parseInt(req.params.id);
        const user = userService.getUserById(userid);
        res.status(200).json(user);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default userRouter;