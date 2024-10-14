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
 *              description: The name of the user
 *            email:
 *              type: string
 *              description: The email of the user
 *            User:
 *              $ref: '#/components/schemas/User'
 */
import express, {NextFunction, Request, Response} from 'express';
import {User} from '../model/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users.
 *      responses:
 */
userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {});