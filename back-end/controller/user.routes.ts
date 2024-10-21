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
 *            name:
 *              type: string
 *              description: Course name.
 *            firstName:
 *              type: string
 *              description: Course name.
 *            password:
 *              type: string
 *              description: Course name.
 *            role:
 *              type: string
 *              description: Course name.
 * 
 */



import express, { Request, Response,NextFunction } from 'express';
import userservice from '../service/user.service';
const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
try {
    const users = await userservice.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
    
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: The user description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userservice.getUserById({id: id});
    res.json(user);
  } catch (error) {
    next(error);
  }
});



export { userRouter };