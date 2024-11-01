import express, { NextFunction, Request, Response } from 'express';
import statusService from '../service/status.service';

const statusRouter = express.Router();

statusRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await statusService.getAllStatuses());
});

statusRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await statusService.getStatusById(parseInt(req.params.id)));
});


export { statusRouter };