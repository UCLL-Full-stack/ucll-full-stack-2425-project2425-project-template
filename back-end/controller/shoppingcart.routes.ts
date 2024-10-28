import express, { NextFunction, Request, Response } from 'express';
import shoppingService from '../service/shoppingcart.service';
import shoppingcartService from '../service/shoppingcart.service';

const shoppingcartRouter = express.Router();

shoppingcartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingcarts = shoppingcartService.getAllShoppingcarts();
        res.status(200).json(shoppingcarts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { shoppingcartRouter };
