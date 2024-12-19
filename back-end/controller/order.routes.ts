import express, { Request, Response, NextFunction } from 'express';
import orderService from '../service/order.service';
import { isAuthenticated } from '../util/jwt';

const orderRouter = express.Router();

// POST /orders
orderRouter.post('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const request = req as Request & { auth: { email: string } };
    const { email } = request.auth;

    try {
        const newOrder = await orderService.createOrder(email);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

// GET /orders
orderRouter.get('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const request = req as Request & { auth: { email: string } };
    const { email } = request.auth;

    try {
        const orders = await orderService.getOrdersByUserEmail(email);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

export { orderRouter };
