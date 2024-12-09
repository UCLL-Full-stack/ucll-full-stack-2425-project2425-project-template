import express, { NextFunction, Request, Response } from 'express';
import carPartService from '../service/carPart.service';

const carPartRouter = express.Router();
carPartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carParts = await carPartService.getAllCarParts();
        res.status(200).json(carParts);
    } catch (error) {
        next(error);
    }
});
export {carPartRouter};
