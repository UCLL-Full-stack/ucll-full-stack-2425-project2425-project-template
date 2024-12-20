import express, { NextFunction, Request, Response } from 'express';
import playerService from '../service/player.service';
import { PlayerInput } from '../types';

const playerRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         imageUrl:
 *           type: string
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retrieve a list of players
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found.
 *       500:
 *         description: Internal server error.
 */
playerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Retrieve a player by ID
 *     description: Fetches the player specified by the ID parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the player to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A player object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found.
 *       500:
 *         description: Internal server error.
 */
playerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await playerService.getPlayerById(Number(req.params.id));
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Player with id ${req.params.id} does not exist.`,
        });
    }
});

/**
 * @swagger
 * /players/image/{id}:
 *   get:
 *     summary: Retrieve the image of a player by ID
 *     description: Fetches the image associated with the player specified by the ID parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the player to retrieve the image for.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A player image object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: URL of the player's image.
 *       404:
 *         description: Player not found.
 *       500:
 *         description: Internal server error.
 */
playerRouter.get('/image/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await playerService.getPlayerImage(Number(req.params.id));
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Player with id ${req.params.id} does not exist.`,
        });
    }
});

/**
 * @swagger
 * /players/user/{email}:
 *   get:
 *     summary: Retrieve players by user email
 *     description: Fetches the players associated with the user specified by the email parameter.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the user to retrieve players for.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
playerRouter.get('/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getPlayersByUser(req.params.email);
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `User with email ${req.params.email} does not exist.`,
        });
    }
});

/**
 * @swagger
 * /players/add:
 *   post:
 *     summary: Add a new player
 *     description: Creates a new player with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The created player object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
playerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with creating player.`,
        });
    }
});

/*
swagger documentation to be added.
*/

playerRouter.put('/coin/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await playerService.giveCoin(req.params.id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with giving a coin.`,
        });
    }
})

/*
swagger documentation to be added.
*/

playerRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await playerService.deletePlayer(+req.params.id);
        res.status(200).json("Player deleted succesfully");
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with deleting user.`,
        });
    }
})

export { playerRouter };
