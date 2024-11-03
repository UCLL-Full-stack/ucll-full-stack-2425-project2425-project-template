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
carRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carId = parseInt(req.params.id, 10);
        await carService.deleteCarById(carId);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        next(error);
    }
});
carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carData = req.body;
        const newCar = await carService.addCar(carData);
        res.status(200).json(newCar);
    } catch (error) {
        next(error);
    }
});

export { carRouter };
