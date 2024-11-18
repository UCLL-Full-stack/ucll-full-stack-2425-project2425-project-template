/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Bestelling:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            datum:
 *              type: Date
 *              description: Datum van de bestelling.
 *            totaalPrijs:
 *              type: number
 *              description: Totale prijs van de bestelling.
 *            pokebowls:
 *              type: array
 *              items: 
 *                  $ref: '#/components/schemas/Pokebowl'
 *              description: Lijst van Pokebowls in de bestelling.
 */
import express, { NextFunction, Request, Response } from 'express';
import bestellingService from '../service/bestelling.service';

const orderRouter = express.Router();

/**
 * @swagger
 * /bestellingen:
 *  post:
 *      summary: Create a new bestelling
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/BestellingInput'
 *      responses:
 *        200:
 *           description: 'Bestelling succesfully created'
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/Bestelling'
 */
// orderRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const bestellingInput = req.body;
//         const newBestelling = await bestellingService.createBestelling(bestellingInput);
//         res.status(201).json(newBestelling);
//     } catch (error) {
//         next(error);
//     }
// });

/**
 * @swagger
 * /bestellingen:
 *   get:
 *     summary: Get a list of all bestellingen.
 *     responses:
 *          200:
 *            description: 'list of bestellingen'
 *            content:
 *                application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Bestelling'
 * 
 */
orderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestellingen = await bestellingService.getAllBestellingen();
        res.status(200).json(bestellingen);
    } catch (error) {
        next(error);
    }
});

orderRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestelling = await bestellingService.getBestellingById(parseInt(req.params.id));
        res.status(200).json(bestelling);
    } catch (error) {
        next(error);
    }
});

export { orderRouter };