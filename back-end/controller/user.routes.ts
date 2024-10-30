/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [admin, parent, child]
 *       description: The role of the user.
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name.
 *         email:
 *           type: string
 *           description: User email.
 *         password:
 *           type: string
 *           description: User Password
 *         role:
 *           $ref: '#/components/schemas/Role'
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

// --------------- GET --------------- //

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: An array of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

export default userRouter;