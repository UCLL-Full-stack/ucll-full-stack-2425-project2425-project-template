/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Animal:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Animal's name.
 *         age:
 *           type: number
 *           format: int32
 *           description: Animal's age.
 *         species:
 *           type: string
 *           description: Animal's species.
 *         favouriteFood:
 *           type: string
 *           description: Animal's favourite food.
 *         favouriteToy:
 *           type: string
 *           description: Animal's favourite toy.
 *         costPerMonth:
 *           type: number
 *           format: int32
 *           description: Cost per month to take care of the animal.
 *         costPerMonthPerSpecies:
 *           type: number
 *           format: int32
 *           description: Cost per month per species to take care of the animal.
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
import animalService from '../service/animal.service';


const animalRouter = express.Router();

/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Get a list of all animals.
 *     responses:
 *      200:
 *          description: A JSON array containing animal objects.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Animal'
 */

animalRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const animals = await animalService.getAllAnimals();
        res.status(200).json(animals);
    } catch (error) {
        next(error);
    }
});

export default animalRouter;