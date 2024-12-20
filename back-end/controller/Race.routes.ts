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
 *      CrashDetails:
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
 *      Racecar:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            type:
 *              type: string
 *            brand:
 *              type: string
 *            hp:
 *              type: number
 *      Participant:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            driver:
 *              $ref: '#/components/schemas/Driver'
 *            racecar:
 *              $ref: '#/components/schemas/Racecar'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Driver name.
 *         surname:
 *           type: string
 *           description: Driver surname.
 *         birthdate:
 *           type: string
 *           format: date
 *         team:
 *           type: string
 *           description: Driver team.
 *         country:
 *           type: string
 *           description: Driver country.
 *         description:
 *           type: string
 *           description: Driver description.
 *     Racecar:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         car_name:
 *           type: string
 *           description: Racecar name.
 *         type:
 *           type: string
 *           description: Racecar type.
 *         brand:
 *           type: string
 *           description: Racecar brand.
 *         hp:
 *           type: number
 *           description: Racecar horsepower.
 *     Participant:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         driver:
 *           $ref: '#/components/schemas/Driver'
 *         racecar:
 *           $ref: '#/components/schemas/Racecar'
 *     Crash:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: "Collision"
 *         description:
 *           type: string
 *           example: "A severe crash"
 *         casualties:
 *           type: integer
 *           example: 5
 *         deaths:
 *           type: integer
 *           example: 2
 *         participants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               driver:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Lewis"
 *                   surname:
 *                     type: string
 *                     example: "Hamilton"
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     example: "1985-01-07"
 *                   team:
 *                     type: string
 *                     example: "Mercedes"
 *                   country:
 *                     type: string
 *                     example: "UK"
 *                   description:
 *                     type: string
 *                     example: "A skilled driver"
 *               racecar:
 *                 type: object
 *                 properties:
 *                   car_name:
 *                     type: string
 *                     example: "W12"
 *                   type:
 *                     type: string
 *                     example: "Formula 1"
 *                   brand:
 *                     type: string
 *                     example: "Mercedes"
 *                   hp:
 *                     type: integer
 *                     example: 1000
 */

import express, { Request, Response, NextFunction } from 'express';
import raceService from '../service/Race.service';
import { RaceInput, CrashInput } from '../types';

const raceRouter = express.Router();

/**
 * @swagger
 * /races:
 *   get:
 *     summary: Retrieve a list of all races
 *     responses:
 *       200:
 *         description: A list of races.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 */
raceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const races = await raceService.getAllRaces();
        res.status(200).json(races);
    } catch (error) {
        next(error);
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
        const newRace = await raceService.createRace(raceInput);
        res.status(201).json(newRace);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('required')) {
            res.status(400).json({ error: err.message });
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

raceRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const race = await raceService.getRaceById(id);
        if (race) {
            res.json(race);
        } else {
            res.status(404).json({ message: 'Race not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /races/{raceId}/crashes:
 *   post:
 *     summary: Add a new crash to a race
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The race ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crash'
 *           example:
 *             type: "Collision"
 *             description: "A severe crash"
 *             casualties: 5
 *             deaths: 2
 *             participants:
 *               - driver:
 *                   name: "Lewis"
 *                   surname: "Hamilton"
 *                   birthdate: "1985-01-07"
 *                   team: "Mercedes"
 *                   country: "UK"
 *                   description: "A skilled driver"
 *                 racecar:
 *                   car_name: "Mercedes W12"
 *                   type: "Formula 1"
 *                   brand: "Mercedes"
 *                   hp: 1000
 *     responses:
 *       200:
 *         description: The updated race with the new crash.
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
raceRouter.post('/:raceId/crashes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const raceId = parseInt(req.params.raceId, 10);
        const crashInput: CrashInput = req.body;
        const updatedRace = await raceService.addCrashToRace(raceId, crashInput);
        res.status(200).json(updatedRace);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /races/{raceId}/crashes/{crashId}:
 *   delete:
 *     summary: Remove a crash from a race
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The race ID
 *       - in: path
 *         name: crashId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The crash ID
 *     responses:
 *       200:
 *         description: The updated race without the removed crash.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         description: Race or crash not found.
 *       500:
 *         description: Internal server error.
 */
raceRouter.delete('/:raceId/crashes/:crashId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const raceId = parseInt(req.params.raceId, 10);
        const crashId = parseInt(req.params.crashId, 10);
        const updatedRace = await raceService.removeCrashFromRace(raceId, crashId);
        res.status(200).json(updatedRace);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /races/crashes/{crashId}:
 *   put:
 *     summary: Edit a crash
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: crashId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The crash ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crash'
 *     responses:
 *       200:
 *         description: Crash updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crash'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Crash not found
 */
raceRouter.put('/crashes/:crashId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const crashId = parseInt(req.params.crashId, 10);
        const crashInput: Partial<CrashInput> = req.body;
        const updatedCrash = await raceService.editCrash(crashId, crashInput);
        res.status(200).json(updatedCrash);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /races/crash/{id}:
 *   get:
 *     summary: Retrieve a crash by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The crash ID
 *     responses:
 *       200:
 *         description: A crash object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crash'
 *       404:
 *         description: Crash not found
 *       500:
 *         description: Internal server error
 */
raceRouter.get('/crash/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const crash = await raceService.getRaceByCrashId(id);
        if (crash) {
            res.json(crash);
        } else {
            res.status(404).json({ message: 'Crash not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /races:
 *   get:
 *     summary: Retrieve a list of all races
 *     tags: [Races]
 *     responses:
 *       200:
 *         description: A list of races.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 */
raceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const races = await raceService.getAllRaces();
        res.status(200).json(races);
    } catch (error) {
        next(error);
    }
});

export { raceRouter };