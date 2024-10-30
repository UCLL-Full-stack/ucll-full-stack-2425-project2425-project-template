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
 *            naam:
 *              type: string
 *              description: Naam van de gebruiker.
 *            voornaam:
 *              type: string
 *              description: Voornaam van de gebruiker.
 *            email:
 *              type: string
 *              description: E-mail van de gebruiker.
 *            gebruikersnaam:
 *              type: string
 *              description: Unieke gebruikersnaam.
 *            rol:
 *              type: Rol
 *              description: Rol van de gebruiker.
 */
import express, { Request, Response, NextFunction } from 'express';
import userService from "../service/user.service";

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Register a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/UserInput'
 *      responses:
 *        200:
 *           description: 'User succesfully registered'
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/User'
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = req.body;
        const newUser = await userService.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *          200:
 *            description: 'list of users'
 *            content:
 *                application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 * 
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction)=> {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error){
        next(error);
    }
});

export {userRouter};