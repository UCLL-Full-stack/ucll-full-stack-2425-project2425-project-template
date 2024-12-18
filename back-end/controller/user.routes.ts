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
import { User } from '../model/user';
import { Rol, UserInput } from '../types';

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
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const newUser = await userService.createUser(user);
        res.status(200).json(newUser);
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
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const users = await userService.getAllUsers({ rol });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}/bestellingen:
 *   get:
 *     summary: Get bestellingen of a user by user ID
 *     responses:
 *       200:
 *         description: The bestellingen data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bestelling'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:id/bestellingen', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestellingen = await userService.getUserBestellingen(parseInt(req.params.id));
        res.status(200).json(bestellingen);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using gebruikersnaam/wachtwoord. Returns an object with JWT token and gebruikersnaam when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}/bestellingen:
 *   get:
 *     summary: Get bestellingen of a user by user ID
 *     responses:
 *       200:
 *         description: The bestellingen data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bestelling'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const id = parseInt(req.params.id);
        await userService.deleteUser({ rol }, id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a user by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const id = parseInt(req.params.id);
        const user = req.body;
        const updatedUser = await userService.updateUser({ rol }, id, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export { userRouter };