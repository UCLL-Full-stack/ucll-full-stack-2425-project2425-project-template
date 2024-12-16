/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Team:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the team.
 *            name:
 *              type: string
 *              description: Team name.
 *            points:
 *              type: number
 *              format: int64
 *              description: Points earned by the team.
 *            owner:
 *              $ref: '#/components/schemas/User'
 *            competitionId:
 *              type: number
 *              format: int64
 *              description: competition
 *      TeamInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              points:
 *                  type: number
 *                  format: int64
 *              owner:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          format: int64
 *              competitionId:
 *                  type: number
 *                  format: int64
 */
import express, { NextFunction, Request, response, Response } from 'express';
import teamService from '../service/team.service';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: Retrieve a list of all teams.
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/TeamInput'
 *     responses:
 *       200:
 *         description: The created team.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */

teamRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = <TeamInput>req.body;
        const result = await teamService.createTeam(team);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/{id}:
 *  get:
 *      summary: Get a team by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The team id.
 *      responses:
 *          200:
 *              description: A team object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Team'
 */

teamRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamService.getTeamById(Number(req.params.id));
        res.status(200).json(team);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/competition/{id}:
 *   get:
 *     summary: Get teams by competition ID
 *     description: Retrieve a list of teams in a specific competition.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The competition ID
 *     responses:
 *       200:
 *         description: A list of teams in the competition.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/competition/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitionId = parseInt(req.params.id, 10);
        if (isNaN(competitionId)) {
            return res.status(400).json({ error: 'Invalid competition ID' });
        }

        const teams = teamDb.getTeamsByCompetition({ competitionId });
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

export default teamRouter;
