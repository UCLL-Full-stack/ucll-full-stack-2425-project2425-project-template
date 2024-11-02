/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Genre:
 *       type: string
 *       description: A genre type for games (e.g., Action, Adventure, RPG).
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the game.
 *         title:
 *           type: string
 *           description: Title of the game.
 *         image:
 *           type: string
 *           description: URL to the game's cover image.
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *           description: List of genres associated with the game.
 *         price:
 *           type: number
 *           description: Price of the game in the specified currency.
 *         discount:
 *           type: number
 *           description: Optional discount on the game, expressed as a percentage.
 */


import express, { NextFunction, Request, Response } from 'express';
import libraryService from '../service/library';

const libraryRouter = express.Router();

/**
 * @swagger
 * /library:
 *   get:
 *     summary: Get a list of all games in the library.
 *     responses:
 *       200:
 *         description: A list of games in the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
libraryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libraryGames = await libraryService.getAllLibraryGames();
        res.status(200).json(libraryGames);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /library/addGame:
 *   post:
 *     summary: Add a new game to the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: The newly added game object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
libraryRouter.post('/addGame', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameData = req.body;
        const newGame = await libraryService.addGameToLibrary(gameData);
        res.status(201).json(newGame);
    } catch (error) {
        next(error);
    }
});

export { libraryRouter };
