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
import { AnimalInput } from '../types';


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

/**
 * @swagger
 * /animals/{caretaker_username}:
 *   get:
 *     summary: animals by caretaker
 *     description: get a list of animals by caretaker username
 *     parameters:
 *       - name: parameterName
 *         in: query
 *         required: true
 *         description: caretaker username
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
animalRouter.get('/:caretaker_username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.caretaker_username;
        const listOfAnimals = await animalService.getAnimalsByCaretaker({ username });
        res.status(200).json(listOfAnimals);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /animals/{id}:
 *   delete:
 *     summary: Delete an animal by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the animal to delete
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Animal deleted successfully
 *       404:
 *         description: Animal not found
 */
animalRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await animalService.deleteAnimal({ id });
        res.status(200).send({ message: 'Animal deleted successfully' });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /animals/{id}/caretaker:
 *   put:
 *     summary: Update the caretaker of an animal by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the animal to update
 *         schema:
 *           type: number
 *       - name: caretakerId
 *         in: query
 *         required: true
 *         description: ID of the new caretaker
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Caretaker updated successfully
 *       404:
 *         description: Animal or caretaker not found
 */
animalRouter.put('/:id/:caretakerId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const animalId = Number(req.params.id);
        const caretakerId = Number(req.params.caretakerId);
        const updatedAnimal = await animalService.putNewCaretaker({ animalId, caretakerId });
        res.status(200).send({ message: 'Animal updated successfully' });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /animals:
 *   post:
 *     summary: Create a new animal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal created successfully
 *       400:
 *         description: Invalid input
 */
animalRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAnimal = <AnimalInput>req.body;
        const createdAnimal = await animalService.createAnimal(newAnimal);
        res.status(200).json(createdAnimal);
    } catch (error) {
        next(error);
    }
});

export default animalRouter;