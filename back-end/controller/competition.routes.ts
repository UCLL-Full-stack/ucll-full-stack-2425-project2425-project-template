import express, { NextFunction, Request, Response } from 'express';
import competitionService from '../service/competition.service';

const competitionRouter = express.Router();

competitionRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const competitions = competitionService.getAllCompetitions();
        res.status(200).send(competitions);
    } catch (error) {
        next(error);
    }
});

export default competitionRouter;