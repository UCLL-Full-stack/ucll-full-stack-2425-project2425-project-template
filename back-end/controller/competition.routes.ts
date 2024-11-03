import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';
import { CompetitionInput } from '../types';

/**
 * @swagger
 *   components:
 *    schemas:
 *      Team:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Team name.
 *            points:
 *              type: number
 *              description: Team points.
 *            players:
 *              type: array
 *              items:
 *                type: string
 *              description: List of players in the team.
 *            coaches:
 *              type: array
 *              items:
 *                type: string
 *              description: List of coaches in the team.
 *      Competition:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Competition name.
 *            teams:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Team'
 */

const competitionRouter = express.Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get a list of all competitions.
 *     description: Retrieve a list of all competitions. The response is a JSON array where each item is of type Competition.
 *     responses:
 *       200:
 *         description: A JSON array of competitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 */
competitionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitions = await competitionService.getAllCompetitions();
        res.status(200).json(competitions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /competitions:
 *   post:
 *     summary: Create a new competition.
 *     description: Create a new competition. The request body must contain a JSON object with the competition details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: The competition was successfully created
 *       400:
 *         description: Bad request. The request body is invalid.
 *       500:
 *         description: Internal server error
 */
competitionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionDTO: CompetitionInput = req.body;
        await competitionService.createCompetition(competitionDTO);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /competitions:
 *   put:
 *     summary: Edit a competition.
 *     description: Edit a competition. The request body must contain a JSON object with the competition details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       200:
 *         description: The competition was successfully edited
 *       400:
 *         description: Bad request. The request body is invalid.
 *       500:
 *         description: Internal server error
 */
competitionRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionDTO: CompetitionInput = req.body;
        if (!competitionDTO.id) {
            res.status(400).send("Competition ID is required.");
            return;
        }
        await competitionService.editCompetition(competitionDTO);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

export default competitionRouter;