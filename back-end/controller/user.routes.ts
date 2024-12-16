/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: User name.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';
import userService from '../service/user.service';
const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all Users.
 *     responses:
 *       200:
 *         description: A list of Users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userService.getAllUsers();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
