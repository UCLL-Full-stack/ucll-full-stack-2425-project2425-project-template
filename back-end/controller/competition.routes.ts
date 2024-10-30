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
import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';

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
competitionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitions = competitionService.getAllCompetitions();
        res.status(200).send(competitions);
    } catch (error) {
        next(error);
    }
});

export default competitionRouter;