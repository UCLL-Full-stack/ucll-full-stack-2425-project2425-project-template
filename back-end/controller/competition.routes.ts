/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Competition:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: Competition name.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';
import { CompetitionInput } from '../types';
const competitionRouter = express.Router();

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Get a list of all Competitions.
 *     responses:
 *       200:
 *         description: A list of Competitions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Competition'
 */

competitionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const competitions = await competitionService.getAllCompetitions();
        res.status(200).json(competitions);
    } catch (error) {
        console.log(error);
    }
});

competitionRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const competition = await competitionService.getCompetitionById(Number(req.params.id));
        res.status(200).json(competition);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'wrong' });
    }
});

competitionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const competition = <CompetitionInput>req.body;
        const result = await competitionService.createCompetition(competition);
        res.status(200).json(competition);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'fout' });
    }
});

export default competitionRouter;
