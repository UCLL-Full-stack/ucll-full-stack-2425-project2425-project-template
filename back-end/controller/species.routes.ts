/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Species:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Species's name.
 *         age:
 *           type: number
 *           format: int32
 *           description: Species's age.
 *         species:
 *           type: string
 *           description: Species's species.
 *         favouriteFood:
 *           type: string
 *           description: Species's favourite food.
 *         favouriteToy:
 *           type: string
 *           description: Species's favourite toy.
 *         costPerMonth:
 *           type: number
 *           format: int32
 *           description: Cost per month to take care of the species.
 *         costPerMonthPerSpecies:
 *           type: number
 *           format: int32
 *           description: Cost per month per species to take care of the species.
 *         caretakers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 *                 description: Caretaker's id.
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 *                   username:
 *                     type: string
 *                     description: Caretaker's username.
 *                   password:
 *                     type: string
 *                     description: Caretaker's password.
 *                   role:
 *                     type: string
 *                     description: Caretaker's role.
 *               name:
 *                 type: string
 *                 description: Caretaker's name.
 */

import express, { NextFunction, Request, Response } from 'express';
import speciesService from '../service/species.service';


const speciesRouter = express.Router();

/**
 * @swagger
 * /species:
 *   get:
 *     summary: Get a list of all species.
 *     responses:
 *      200:
 *          description: A JSON array containing species objects.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Species'
 */

speciesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const species = await speciesService.getAllSpecies();
        res.status(200).json(species);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /species/{id}:
 *   get:
 *     summary: animals by species
 *     description: get a list of animals by species
 *     parameters:
 *       - name: parameterName
 *         in: query
 *         required: true
 *         description: species id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success response description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
speciesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const listOfAnimals = await speciesService.getAnimalsFromSpecies({ id });
        res.status(200).json(listOfAnimals);
    } catch (error) {
        next(error);
    }
});

export default speciesRouter;