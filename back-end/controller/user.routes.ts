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
 *            username:
 *              type: string
 *              description: User name.
 *            hashedPassword:
 *              type: string
 *              description: User password.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A successful response returns an array of users. Each item in the array is of type User.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await userService.getAllUsers());
});

/**
 * @swagger
 * /Users/{id}:
 *   get:
 *     summary: Get a User with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The User id.
 *     responses:
 *       200:
 *         description: A successful response returns a user of type User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await userService.getUserById(parseInt(req.params.id)));
});


export { userRouter };
