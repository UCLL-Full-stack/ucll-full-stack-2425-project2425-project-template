/**
 * @swagger
 *   components:
 *    schemas:
 *      Driver:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Driver name.
 *            team:
 *              type: string
 *              description: Driver team.
 *            description:
 *              type: string
 *              description: Driver description.
 *            age:
 *              type: number
 *              description: Driver age.
 *            racecar:
 *              $ref: '#/components/schemas/Racecar'
 *      Crash:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            type:
 *              type: string
 *              description: Crash type.
 *            description:
 *              type: string
 *              description: Crash description.
 *            casualties:
 *              type: number
 *              description: Number of casualties.
 *            deaths:
 *              type: number
 *              description: Number of deaths.
 *      Admin:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Admin name.
 *      Gebruiker:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: Username.
 */
import express, { NextFunction, Request, Response } from 'express';
import raceService from '../service/Race.service';
import { RaceInput } from '../types';

const raceRouter = express.Router();

/**
 * @swagger
 * /races:
 *   get:
 *     summary: Get all races
 *     tags: [Races]
 *     responses:
 *       200:
 *         description: List of races
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 *             examples:
 *               example-1:
 *                 value:
 *                   - id: 1
 *                     name: "Grand Prix"
 *                     type: "Formula 1"
 *                     description: "A high-speed race"
 *                     location: "Monaco"
 *                     drivers:
 *                       - name: "Lewis Hamilton"
 *                         team: "Mercedes"
 *                         description: "A skilled driver"
 *                         age: 36
 *                         racecar:
 *                           car_name: "Mercedes W12"
 *                           type: "Formula 1"
 *                           description: "A fast racecar"
 *                           hp: 1000
 *                         crash:
 *                           type: "Collision"
 *                           description: "A severe crash"
 *                           casualties: 5
 *                           deaths: 2
 *                     crashes:
 *                       - type: "Collision"
 *                         description: "A severe crash"
 *                         casualties: 5
 *                         deaths: 2
 *                     admin:
 *                       username: "adminuser"
 *                       password: "adminpassword"
 */
raceRouter.get('/', (req, res) => {
    try {
        const races = raceService.getAllRaces();
        res.status(200).json(races);
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

/**
 * @swagger
 * /races:
 *   post:
 *     summary: Create a new race
 *     tags: [Races]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *           example:
 *             id: 1
 *             name: "Grand Prix"
 *             type: "Formula 1"
 *             description: "A high-speed race"
 *             location: "Monaco"
 *             drivers:
 *               - id: 1
 *                 name: "Lewis Hamilton"
 *                 team: "Mercedes"
 *                 description: "A skilled driver"
 *                 age: 36
 *                 racecar:
 *                   id: 1
 *                   car_name: "Mercedes W12"
 *                   type: "Formula 1"
 *                   description: "A fast racecar"
 *                   hp: 1000
 *                 crash:
 *                   id: 1
 *                   type: "Collision"
 *                   description: "A severe crash"
 *                   casualties: 5
 *                   deaths: 2
 *             crashes:
 *               - id: 1
 *                 type: "Collision"
 *                 description: "A severe crash"
 *                 casualties: 5
 *                 deaths: 2
 *             admin:
 *               id: 1
 *               username: "adminuser"
 *               password: "adminpassword"
 *     responses:
 *       201:
 *         description: The created race.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
raceRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const raceInput: RaceInput = req.body;
        const newRace = raceService.createRace(raceInput);
        res.status(201).json(newRace);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('required')) {
            res.status(404).json({ error: err.message });
        } else {
            next(err);
        }
    }
});

/**
 * @swagger
 * /races/{id}:
 *   get:
 *     summary: Retrieve a race by ID
 *     description: Retrieve a race by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The race ID
 *     responses:
 *       200:
 *         description: A race object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         description: Race not found
 */

raceRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const race = raceService.getRaceById(id);
    if (race) {
      res.json(race);
    } else {
      res.status(404).json({ message: 'Race not found' });
    }
  });

export { raceRouter };

/**
 * @swagger
 * /races/{id}:
 *   put:
 *     summary: Update a race by ID
 *     description: Update a race by its ID in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The race ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: The updated race.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Race not found.
 *       500:
 *         description: Internal server error.
 */
raceRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const raceInput: RaceInput = req.body;
        const updatedRace = await raceService.updateRace(id, raceInput);
        if (updatedRace) {
            res.status(200).json(updatedRace);
        } else {
            res.status(404).json({ message: 'Race not found' });
        }
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('required')) {
            res.status(400).json({ error: err.message });
        } else {
            next(err);
        }
    }
});