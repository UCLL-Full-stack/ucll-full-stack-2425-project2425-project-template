import express, { Router, Request, Response, NextFunction } from "express";
import cocktailService from "../service/cocktail.service";

const cocktailRouter = express.Router();


/**
 * @swagger
 * /cocktails:
 *   get:
 *     summary: Get a list of all cocktails.
 *     responses:
 *       200:
 *         description: A list of cocktails.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Cocktail'
 */
cocktailRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cocktails = await cocktailService.getAllCocktails();
        res.status(200).json(cocktails);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /cocktails/{id}:
 *  get:
 *      summary: Get a cocktail by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The cocktail id.
 *      responses:
 *          200:
 *              description: A cocktail object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 */
cocktailRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cocktail = await cocktailService.getCocktailById({ id: Number(req.params.id) });
        res.status(200).json(cocktail);
    } catch (error) {
        next(error);
    }
});

export { cocktailRouter };