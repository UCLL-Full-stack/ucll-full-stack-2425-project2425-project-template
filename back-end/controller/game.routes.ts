/**
 * @swagger
 *   components:
 *     schemas:
 *       Game:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           date:
 *             type: Date
 *             description: The date of the game.
 *           result:
 *             type: string
 *             description: The result of the game.
 *           teams:
 *             type: array
 *             description: The teams playing the game.
 *             items:
 *             $href: '#/components/schemas/Team'
 *       gameInput:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: The ID for the game.
 *           date:
 *             type: Date
 *             description: The date of the game.
 *           result:
 *             type: string
 *             description: The result of the game.
 *           teams:
 *             type: array
 *             description: The teams playing the game.
 *             items:
 *             $href: '#/components/schemas/Team'
 */

import express, { NextFunction, Request, Response } from 'express';
import teamService from '../service/team.service';
import gameService from '../service/game.service';

const gameRouter = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games.
 *     responses:
 *       200:
 *         description: A JSON array of all games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = gameService.getAllGames();
        res.status(200).json(games);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games/{id}:
 *   get:
 *      summary: Get a game by ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the game to return.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON object of the game.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Game'
 */
gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = gameService.getGameById(Number(req.params.id));
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/gameInput'
 *     responses:
 *       200:
 *         description: The created game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = gameService.createGame(req.body);
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { gameRouter };
