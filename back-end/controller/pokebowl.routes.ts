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
 *              items:
 *                type: string
 *      PokebowlInput:
 *          type: object
 *          required:
 *            - naam
 *            - type
 *            - maxAantalIngredienten
 *          properties:
 *            naam:
 *              type: string
 *              description: Pokebowl naam.
 *            type:
 *              type: string
 *              description: Pokebowl type.
 *            beschrijving:
 *              type: string
 *              description: Optional Pokebowl beschrijving.
 *            maxAantalIngredienten:
 *              type: number
 *              description: Pokebowl maxAantalIngredienten.
 *            ingredienten:
 *              type: array
 *              description: Pokebowl ingredienten.
 *              items:
 *                $ref: '#/components/schemas/Ingredient'
 */
import express, { NextFunction, Request, Response } from 'express';
import pokebowlService from '../service/pokebowl.service';
import { PokebowlInput, Rol } from '../types';

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
 *                  example:
 *                    naam: "Deluxe tuna bowl"
 *                    type: "Custom"
 *                    beschrijving: "Fancy deluxe tuna bowl with cucumber"
 *                    maxAantalIngredienten: 7
 *                    ingredienten:
 *                      - id: 4
 *                        naam: "Tuna"
 *                        type: "Protein"
 *                        aantal: 50
 *                        prijs: 3.62
 *                      - id: 5
 *                        naam: "Corn"
 *                        type: "Topping"
 *                        aantal: 198
 *                        prijs: 0.54
 *                      - id: 6
 *                        naam: "Seaweed"
 *                        type: "Topping"
 *                        aantal: 228
 *                        prijs: 1.09
 *                      - id: 7
 *                        naam: "Srirachia"
 *                        type: "Sauce"
 *                        aantal: 450
 *                        prijs: 1.14
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
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const pokebowl = <PokebowlInput>req.body;
        const result = await pokebowlService.createPokebowl({ rol }, pokebowl);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /pokebowls/{id}:
 *   get:
 *     summary: Get a pokebowl by ID
 *     responses:
 *       200:
 *         description: The pokebowl data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokebowl'
 *       404:
 *         description: Pokebowl not found
 *       500:
 *         description: Internal server error
 */
pokebowlRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokebowl = await pokebowlService.getPokebowlById(parseInt(req.params.id));
        res.status(200).json(pokebowl);
    } catch (error) {
        next(error);
    }
});

export { pokebowlRouter };