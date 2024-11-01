/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Library:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the library.
 *            games:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      description: Unique identifier for the game.
 *                    title:
 *                      type: string
 *                      description: Title of the game.
 *                    image:
 *                      type: string
 *                      description: URL or path to the game image.
 *                    categories:
 *                      type: array
 *                      items:
 *                        type: string
 *                        enum: [Action, Adventure, Fighting, FPS, RPG]
 *                      description: List of categories or genres of the game.
 *                    price:
 *                      type: number
 *                      format: float
 *                      description: Price of the game.
 *            achievements:
 *              type: number
 *              description: Total achievements earned in the library.
 *            timePlayed:
 *              type: number
 *              description: Total time played for all games in hours.
 */
import express, { NextFunction, Request, Response } from 'express';
import libraryService from '../service/library';

const libraryRouter = express.Router();

/**
 * @swagger
 * /library:
 *   get:
 *     summary: Get a list of all games in the library.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of games within the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Library'
 */
libraryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libraryGames = await libraryService.getAllLibraryGames();
        res.status(200).json(libraryGames);
    } catch (error) {
        next(error);
    }
});

export { libraryRouter };
