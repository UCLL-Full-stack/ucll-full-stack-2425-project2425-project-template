import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';

const itemRouter = express.Router();

itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { itemRouter };
