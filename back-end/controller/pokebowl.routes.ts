/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Pokebowl:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            naam:
 *              type: string
 *              description: Pokebowl naam.
 *            type:
 *              type: string
 *              description: Pokebowl type.
 *            beschrijving:
 *              type: string
 *              description: Pokebowl beschrijving.
 *            maxAantalIngredienten:
 *              type: number
 *              description: Pokebowl maxAantalIngredienten.
 *            ingredienten:
 *              type: array
 *              description: Pokebowl ingredienten.
 */
import express, { NextFunction, Request, Response } from 'express';
import pokebowlService from '../service/pokebowl.service';
import { PokebowlInput } from '../types';

const pokebowlRouter = express.Router();


/**
 * @swagger
 * /pokebowls:
 *   get:
 *     summary: Get a list of all pokebowls.
 *     responses:
 *          200:
 *            description: 'Pokebowls list'
 *            content:
 *                application/json:
 *                  $ref: '#/components/schemas/Pokebowl'
 * 
 */
pokebowlRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokebowls = await pokebowlService.getAllPokebowls();
        res.status(200).json(pokebowls);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /pokebowls:
 *  post:
 *      summary: Create new Pokebowl
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/PokebowlInput'
 *      responses:
 *        200:
 *           description: 'Create new Pokebowl'
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/Pokebowl'
 * 
 */
pokebowlRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokebowl = <PokebowlInput>req.body;
        const result = await pokebowlService.createPokebowl(pokebowl);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

pokebowlRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokebowl = await pokebowlService.getPokebowlById(parseInt(req.params.id));
        res.status(200).json(pokebowl);
    } catch (error) {
        next(error);
    }
});

export { pokebowlRouter };