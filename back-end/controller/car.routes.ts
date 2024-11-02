import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';


const carRouter = express.Router();
carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});
export { carRouter };
