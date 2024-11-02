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
 * /libraries/games:
 *   get:
 *     summary: Get a list of games in the library by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the library to retrieve games from.
 *     responses:
 *       200:
 *         description: A list of games in the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       400:
 *         description: Missing or invalid `id` parameter.
 */
libraryRouter.get('/games', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "Missing or invalid `id` parameter" });
        }

        const libraryGames = await libraryService.getAllLibraryGames(Number(id));
        res.status(200).json(libraryGames);
    } catch (error) {
        next(error);
    }
});

export { libraryRouter };
